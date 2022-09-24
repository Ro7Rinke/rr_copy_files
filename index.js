const fs = require('fs')

const args = process.argv.slice(2)

const inRootPath = args[0]
const outRootPath = args[1]

let dirPaths = []
let filePaths = []

let errorsCopyFiles = []
let errors = []

const checkDir = (path, isStart = false) => {
    const result = fs.readdirSync(isStart ? path : `${inRootPath}/${path}`)

    result.forEach(element => {

        const newPath = isStart ? `${element}` : `${path}/${element}`

        if(fs.statSync(`${inRootPath}/${newPath}`).isDirectory()){
            dirPaths.push(`${newPath}`)
            if(!fs.existsSync(`${outRootPath}/${newPath}`))
                fs.mkdirSync(`${outRootPath}/${newPath}`)
            checkDir(`${newPath}`)
        }else{
            filePaths.push(`${newPath}`)
        }
    })
}

const copyFiles = () => {
    filePaths.forEach(file => {
        try {
            fs.copyFile(`${inRootPath}/${file}`, `${outRootPath}/${file}`, (error) => {
                if(error){
                    errorsCopyFiles.push({
                        file: `${inRootPath}/${file}`,
                        error
                    })
                    console.log(errorsCopyFiles)
                }
            })
        } catch (error) {
            errors.push({
                file: `${inRootPath}/${file}`,
                error
            })
        }
    })
}

const main = async () => {

    checkDir(inRootPath, true)

    copyFiles()

    // console.log(errorsCopyFiles)

    // fs.writeFileSync('./errors.json', JSON.stringify(errors))
    // fs.writeFileSync('./errorsCopyFiles.json', JSON.stringify(errorsCopyFiles))
}

main()