#!/usr/bin/env node --enable-source-maps

import { detectImportWithError } from '@kurone-kito/web-toybox-node';

detectImportWithError(import.meta.url);

console.log('Hello, World!');
