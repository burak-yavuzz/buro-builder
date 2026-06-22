import { describe, it, expect } from 'vitest'
import { componentSchemas } from '../src/config/schemas'

describe('Component Schemas', () => {

    it('tüm componentler name içermeli', () => {

        Object.values(componentSchemas).forEach(schema => {

            expect(schema.name).toBeTruthy()

        })

    })

    it('tüm componentler props içermeli', () => {

        Object.values(componentSchemas).forEach(schema => {

            expect(schema.props).toBeDefined()

        })

    })

})