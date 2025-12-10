#!/usr/bin/env node

/**
 * 🎙️ AUDIO GENERATION SCRIPT
 *
 * Genera MP3 per la narrazione usando Piper TTS
 *
 * Usage:
 *   npm run generate              # Genera audio per tutti i nodi
 *   npm run generate:single start # Genera solo per nodo "start"
 *   npm run list-voices           # Lista voci disponibili
 *   npm run test-piper            # Testa setup Piper
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '../../');
const OUTPUT_DIR = join(ROOT_DIR, 'public/sounds/narration');
const CONFIG_PATH = join(__dirname, 'piper-config.json');

// ============================================
// CONFIGURATION
// ============================================

let config = null;

async function loadConfig() {
  const configContent = await readFile(CONFIG_PATH, 'utf-8');
  config = JSON.parse(configContent);
  return config;
}

// ============================================
// PIPER TTS WRAPPER
// ============================================

/**
 * Genera audio usando Piper TTS via Docker
 */
async function generateAudioWithPiper(text, outputPath) {
  const { voiceModel, audio } = config;

  console.log(`🎙️  Generating: ${outputPath}`);
  console.log(`📝 Text: ${text.substring(0, 50)}...`);

  // Crea file WAV temporaneo
  const tempWav = outputPath.replace('.mp3', '.wav');

  try {
    // Comando Piper via Docker
    const piperCmd = `echo "${text.replace(/"/g, '\\"')}" | docker run -i --rm \\
      -v "${OUTPUT_DIR}:/output" \\
      ghcr.io/rhasspy/piper:latest \\
      --model ${voiceModel} \\
      --output_file /output/$(basename ${tempWav})`;

    console.log('🐳 Running Piper via Docker...');
    await execAsync(piperCmd);

    // Converti WAV → MP3 con ffmpeg
    if (existsSync(tempWav)) {
      console.log('🎵 Converting WAV → MP3...');
      await execAsync(
        `ffmpeg -i "${tempWav}" -codec:a libmp3lame -b:a ${audio.bitrate} -y "${outputPath}" 2>&1 | grep -v "frame="`
      );

      // Rimuovi WAV temp
      await execAsync(`rm "${tempWav}"`);

      console.log(`✅ Generated: ${outputPath}\n`);
      return true;
    }

    throw new Error('WAV file not created by Piper');
  } catch (error) {
    console.error(`❌ Error generating audio: ${error.message}`);
    return false;
  }
}

/**
 * Fallback: Genera audio usando Web Speech API (browser)
 * Questo richiede un browser headless come Puppeteer
 */
async function generateAudioWithWebSpeech(text, outputPath) {
  console.warn('⚠️  Piper non disponibile, usa Web Speech API manualmente');
  console.log(`   Text: ${text}`);
  console.log(`   Output: ${outputPath}`);
  return false;
}

// ============================================
// STORY NODES PARSING
// ============================================

/**
 * Estrae i nodi da storyNodes.ts
 */
async function parseStoryNodes() {
  const storyNodesPath = join(ROOT_DIR, 'src/data/storyNodes.ts');
  const content = await readFile(storyNodesPath, 'utf-8');

  // Parse manuale del file TypeScript
  // Cerca pattern: nodeId: { id: 'nodeId', title: '...', text: `...` }

  const nodes = [];
  const nodeRegex = /(\w+):\s*\{[^}]*id:\s*['"](\w+)['"],[^}]*text:\s*`([^`]+)`/gs;

  let match;
  while ((match = nodeRegex.exec(content)) !== null) {
    const [, , nodeId, text] = match;

    // Pulisci il testo
    const cleanText = text
      .replace(/\n\n/g, '. ') // Paragrafi → pausa
      .replace(/\n/g, ' ')     // Newline → spazio
      .replace(/\s+/g, ' ')    // Spazi multipli → singolo
      .trim();

    nodes.push({
      id: nodeId,
      text: cleanText
    });
  }

  console.log(`📚 Found ${nodes.length} story nodes`);
  return nodes;
}

// ============================================
// MAIN GENERATION LOGIC
// ============================================

async function generateAllAudio() {
  console.log('🚀 Starting audio generation...\n');

  await loadConfig();

  // Assicura che output dir esista
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  // Parse story nodes
  const nodes = await parseStoryNodes();

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const node of nodes) {
    const outputPath = join(OUTPUT_DIR, `${node.id}.mp3`);

    // Skip se già esiste (opzionale: aggiungi flag --force)
    if (existsSync(outputPath)) {
      console.log(`⏭️  Skipping ${node.id} (already exists)`);
      skipped++;
      continue;
    }

    const success = await generateAudioWithPiper(node.text, outputPath);

    if (success) {
      generated++;
    } else {
      failed++;
    }

    // Pausa tra generazioni per non sovraccaricare
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log('\n📊 SUMMARY:');
  console.log(`   Generated: ${generated}`);
  console.log(`   Skipped:   ${skipped}`);
  console.log(`   Failed:    ${failed}`);
  console.log(`   Total:     ${nodes.length}`);
}

/**
 * Genera audio per singolo nodo
 */
async function generateSingleNode(nodeId) {
  console.log(`🎯 Generating audio for node: ${nodeId}\n`);

  await loadConfig();

  const nodes = await parseStoryNodes();
  const node = nodes.find((n) => n.id === nodeId);

  if (!node) {
    console.error(`❌ Node "${nodeId}" not found`);
    console.log(`\nAvailable nodes: ${nodes.map((n) => n.id).join(', ')}`);
    process.exit(1);
  }

  const outputPath = join(OUTPUT_DIR, `${node.id}.mp3`);
  await generateAudioWithPiper(node.text, outputPath);
}

/**
 * Test setup Piper
 */
async function testPiper() {
  console.log('🧪 Testing Piper setup...\n');

  try {
    // Test Docker
    console.log('Checking Docker...');
    await execAsync('docker --version');
    console.log('✅ Docker installed\n');

    // Test Piper image
    console.log('Checking Piper image...');
    await execAsync('docker pull ghcr.io/rhasspy/piper:latest');
    console.log('✅ Piper image available\n');

    // Test ffmpeg
    console.log('Checking ffmpeg...');
    await execAsync('ffmpeg -version | head -1');
    console.log('✅ ffmpeg installed\n');

    console.log('🎉 All dependencies ready!');
  } catch (error) {
    console.error('❌ Setup incomplete:', error.message);
    console.log('\nInstallation instructions:');
    console.log('  - Docker: https://docs.docker.com/get-docker/');
    console.log('  - ffmpeg: sudo apt install ffmpeg (Linux) / brew install ffmpeg (Mac)');
  }
}

/**
 * Lista voci disponibili
 */
async function listVoices() {
  await loadConfig();

  console.log('🎙️  Available voices:\n');
  console.log(`Primary: ${config.voice.name} (${config.voiceModel})`);
  console.log(`  ${config.voice.description}\n`);

  if (config.alternatives) {
    console.log('Alternatives:');
    config.alternatives.forEach((voice) => {
      console.log(`  - ${voice.name} (${voice.model})`);
      console.log(`    ${voice.description}`);
    });
  }
}

// ============================================
// CLI INTERFACE
// ============================================

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🎙️  Dream Adventure Audio Generator

Usage:
  npm run generate              Generate all audio files
  npm run generate:single NODE  Generate audio for specific node
  npm run list-voices           List available voices
  npm run test-piper            Test Piper setup

Options:
  --help, -h                    Show this help
  --force                       Regenerate existing files

Examples:
  npm run generate
  npm run generate:single start
  npm run generate:single -- rocco_intro --force
  `);
  process.exit(0);
}

if (args.includes('--test')) {
  testPiper();
} else if (args.includes('--list-voices')) {
  listVoices();
} else if (args.includes('--node') || args[0]) {
  const nodeId = args.find((arg) => !arg.startsWith('--')) || args[args.indexOf('--node') + 1];
  generateSingleNode(nodeId);
} else {
  generateAllAudio();
}
