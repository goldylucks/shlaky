const getServiceTemplate = serviceName => `import Service from './Service'

class ${serviceName}Service extends Service {
   
}

export default ${serviceName}Service`

export default getServiceTemplate
