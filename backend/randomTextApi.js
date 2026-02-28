const WORDS_DATABASE = [
  'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'hello', 'world',
  'code', 'type', 'race', 'speed', 'words', 'finger', 'keyboard', 'fast', 'smooth', 'flow',
  'night', 'light', 'bright', 'storm', 'river', 'stone', 'space', 'dream', 'craft', 'skill',
  'ocean', 'mountain', 'forest', 'desert', 'valley', 'cloud', 'rain', 'snow', 'wind', 'fire',
  'earth', 'water', 'metal', 'wood', 'glass', 'paper', 'plastic', 'string', 'wire', 'cable',
  'system', 'network', 'server', 'client', 'router', 'switch', 'hub', 'packet', 'data', 'byte',
  'function', 'variable', 'object', 'array', 'string', 'number', 'boolean', 'null', 'undefined', 'class',
  'method', 'property', 'event', 'listener', 'handler', 'callback', 'promise', 'async', 'await', 'fetch',
  'react', 'node', 'express', 'mongo', 'socket', 'database', 'frontend', 'backend', 'fullstack', 'api',
  'design', 'color', 'theme', 'dark', 'light', 'contrast', 'shadow', 'glow', 'blur', 'glass',
  'game', 'player', 'lobby', 'match', 'score', 'rank', 'winner', 'loser', 'time', 'clock'
];

function getRandomWords(count = 30) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * WORDS_DATABASE.length);
    result.push(WORDS_DATABASE[randomIndex]);
  }
  return result;
}

async function getData() {
  // Simulating an async operation for compatibility with existing code
  return Promise.resolve(getRandomWords());
}

module.exports = { getData };