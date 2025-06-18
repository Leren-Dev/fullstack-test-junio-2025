import Repl from '@ioc:Adonis/Addons/Repl'

Repl.addMethod(
  'testMethod',
  (_repl) => {
    console.log('Testing REPL')

    return false
  },
  {
    description: 'A test method',
    usage: `testMethod${Repl.colors.gray('()')}`,
  }
)
