const config = {
  domain: 'shlaky.com',
  localStorageKeys: ['task'],
  routes: ['surprise'],
  components: [],
  resources: [
    {
      key: 'tasks',
      fields: [
        { fieldKey: 'title', type: 'string' },
        { fieldKey: 'isDone', type: 'bool' },
      ],
    },
    {
      key: 'users',
      fields: [
        { fieldKey: 'age', type: 'number' },
        {
          fieldKey: 'level',
          type: 'enum',
          allowed: ['novice', 'sage'],
          initial: 'novice',
        },
      ],
    },
  ],
  states: [
    {
      key: 'visualMode',
      initial: 'light',
      allowed: ['light', 'dark'],
    },
  ],
}

export default config
