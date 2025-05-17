#!/usr/bin/env node

import { program } from 'commander'
import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import { spawn } from 'child_process'
