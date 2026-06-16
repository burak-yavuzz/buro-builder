import { defineStore } from 'pinia'
import { componentSchemas } from '../config/schemas'

export const useBuilderStore = defineStore('builder', {
    state: () => ({
        pageData: [],
        selectedNodeId: null
    }),
    getters: {
        selectedNode: (state) => {
            let found = null;
            const findNode = (nodes) => {
                for (const node of nodes) {
                    if (node.id === state.selectedNodeId) { found = node; break; }
                    if (node.children && node.children.length > 0) findNode(node.children);
                }
            };
            findNode(state.pageData);
            return found;
        }
    },
    actions: {
        generateId() { return 'id_' + Math.random().toString(36).substr(2, 9); },

        createNode(type) {
            const schema = componentSchemas[type];
            const props = {};
            Object.keys(schema.props).forEach(key => props[key] = schema.props[key].default);

            return {
                id: this.generateId(),
                type: type,
                props: props,
                children: [] // Row/Col gibi elemanlar için alt eleman listesi
            };
        },
        selectNode(id) { this.selectedNodeId = id; },

        removeNode(id) {
            const removeRecursive = (nodes) => {
                const index = nodes.findIndex(n => n.id === id);
                if (index !== -1) {
                    nodes.splice(index, 1);
                    if (this.selectedNodeId === id) this.selectedNodeId = null;
                    return true;
                }
                for (const node of nodes) {
                    if (node.children && removeRecursive(node.children)) return true;
                }
                return false;
            };
            removeRecursive(this.pageData);
        },
        exportJSON() { return JSON.stringify(this.pageData, null, 2); }
    }
});