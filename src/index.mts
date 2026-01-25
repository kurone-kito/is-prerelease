#!/usr/bin/env node --enable-source-maps

import { detectImportWithError } from '@kurone-kito/web-toybox-node';
import { prerelease } from 'semver';

const [, , version = '"0.0.0"', pre = ''] = process.argv;
detectImportWithError(import.meta.url);
process.exitCode = (prerelease(JSON.parse(version)) ? pre : !pre) ? 0 : 1;
