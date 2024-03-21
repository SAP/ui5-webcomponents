import { mount } from 'cypress-ct-lit'
import "./commands.js";

import "../../../../main/src/bundle.esm.ts"

Cypress.Commands.add('mount', mount)