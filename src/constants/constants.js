export const TOOLS = {
    INLINE: 'inline',
    SIMPLIFY: 'simplify',
    DESUGAR: 'desugar',
    SYNTHESIZE_ORACLES: 'synthesize_oracles',
    ROTATION_FOLD: 'rotation_fold',
    CNOT_OPTIMIZATION: 'cnot_resynth'
}

export const TOOLS_CONFIG = {
    inline: {
        label: 'Inline',
        key: TOOLS.INLINE,
        params: [
            {
                label: 'Clear decimals',
                key: 'clear_decls',
                type: 'boolean',
                value: false
            }
        ]
    },
    simplify: {
        label: 'Simplify',
        key: TOOLS.SIMPLIFY,
        params: [
            {
                label: 'No Fixpoint',
                key: 'no_fixpoint',
                type: 'boolean',
                value: false
            }
        ]
    },
    desugar: {
        label: 'Desugar',
        key: TOOLS.DESUGAR,
        params: []
    },
    synthesize_oracles: {
        label: 'Synthesize Oracles',
        key: TOOLS.SYNTHESIZE_ORACLES,
        params: []
    },
    rotation_fold: {
        label: 'Rotation Fold',
        key: TOOLS.ROTATION_FOLD,
        params: [
            {
                label: 'No Correction',
                key: 'no_correction',
                type: 'boolean',
                value: false
            }
        ]
    },
    cnot_resynth: {
        label: 'CNOT Optimization',
        key: TOOLS.CNOT_OPTIMIZATION,
        params: []
    }
}