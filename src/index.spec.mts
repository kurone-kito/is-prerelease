import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@kurone-kito/web-toybox-node', () => ({
  detectImportWithError: vi.fn(),
}));

describe('is-prerelease CLI', () => {
  const originalArgv = process.argv;
  const originalExitCode = process.exitCode;

  beforeEach(() => {
    vi.resetModules();
    process.exitCode = undefined;
  });

  afterEach(() => {
    process.argv = originalArgv;
    process.exitCode = originalExitCode;
  });

  const runCli = async (version?: string, pre?: string) => {
    const args = ['node', 'index.mjs'];
    if (version !== undefined) args.push(version);
    if (pre !== undefined) args.push(pre);
    process.argv = args;
    await import('./index.mjs');
  };

  describe('prerelease versions', () => {
    it.each([
      ['"1.0.0-alpha"', 'pre'],
      ['"1.0.0-beta.1"', 'pre'],
      ['"2.0.0-rc.1"', 'pre'],
    ])('should exit with 0 when version=%s and pre=%s', async (version, pre) => {
      await runCli(version, pre);
      expect(process.exitCode).toBe(0);
    });

    it.each([
      ['"1.0.0-alpha"'],
      ['"1.0.0-beta.1"'],
      ['"2.0.0-rc.1"'],
    ])('should exit with 1 when version=%s and pre is empty', async (version) => {
      await runCli(version, '');
      expect(process.exitCode).toBe(1);
    });

    it.each([
      ['"1.0.0-alpha"'],
      ['"1.0.0-beta.1"'],
    ])('should exit with 1 when version=%s and pre is not provided', async (version) => {
      await runCli(version);
      expect(process.exitCode).toBe(1);
    });
  });

  describe('stable versions', () => {
    it.each([
      ['"1.0.0"'],
      ['"2.3.4"'],
      ['"0.1.0"'],
    ])('should exit with 0 when version=%s and pre is not provided', async (version) => {
      await runCli(version);
      expect(process.exitCode).toBe(0);
    });

    it.each([
      ['"1.0.0"'],
      ['"2.3.4"'],
      ['"0.1.0"'],
    ])('should exit with 0 when version=%s and pre is empty string', async (version) => {
      await runCli(version, '');
      expect(process.exitCode).toBe(0);
    });

    it.each([
      ['"1.0.0"', 'pre'],
      ['"2.3.4"', 'pre'],
      ['"0.1.0"', 'stable'],
    ])('should exit with 1 when version=%s and pre=%s', async (version, pre) => {
      await runCli(version, pre);
      expect(process.exitCode).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('should exit with 1 when empty version with pre flag', async () => {
      await runCli('""', 'pre');
      expect(process.exitCode).toBe(1);
    });

    it('should exit with 0 when null version without pre flag', async () => {
      await runCli('null');
      expect(process.exitCode).toBe(0);
    });

    it('should exit with 1 when null version with pre flag', async () => {
      await runCli('null', 'pre');
      expect(process.exitCode).toBe(1);
    });
  });
});
