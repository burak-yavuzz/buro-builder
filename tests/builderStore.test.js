import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useBuilderStore } from '../src/store/builderStore'

describe('Builder Store', () => {

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('id üretmeli', () => {

        const store = useBuilderStore()

        const id = store.generateId()

        expect(id).toContain('id_')

    })

    it('node seçmeli', () => {

        const store = useBuilderStore()

        store.selectNode('abc')

        expect(store.selectedNodeId).toBe('abc')

    })

})