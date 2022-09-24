const fs = require('fs')

const args = process.argv.slice(2)

const inRootPath = args[0]
const outRootPath = args[1]

const main = async () => {
    try {
        const data = fs.readFileSync(inRootPath, {encoding:'base64'})
        console.log(data)
        fs.writeFileSync(outRootPath, data, {encoding:'base64'})
    } catch (error) {
        console.log(error)
    }
}

main()