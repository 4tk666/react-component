module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/warnings',
    'plugin:tailwindcss/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'tailwindcss', 'jsx-a11y'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'no-extra-boolean-cast': 'off',
    'no-shadow': 'error',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'prefer-destructuring': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc', // importをアルファベット順に並べる
        },
      },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    tailwindcss: {
      callees: ['clsx'],
      config: 'tailwind.config.cjs',
    },
  },
};
