
let fs = require("fs");
let pwd = process.cwd()

function getFiles(path)
{
    let temp = fs.readdirSync(path);
    let files=[]
    for(let i in temp)
    {
        if(temp[i].includes('.'))
            files.push(path+"\\"+temp[i]);
        else
            files=files.concat(getFiles(path+"\\"+temp[i]));
    }
    return files;
}

function moveFiles(oldPath,newPath)
{
    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
      })
}

let files = getFiles(pwd)

let txt = ['txt','docx','doc','pdf']
let pic = ['jpg','jpeg','png']
let aud = ['mp3','wav']
let vid = ['mp4','avi','mov']

fs.mkdir(pwd+"//Audio", function(err){ 
    if (err)
        return console.error(err); 
}); 
fs.mkdir(pwd+"//Video", function(err){ 
    if (err)
        return console.error(err); 
}); 
fs.mkdir(pwd+"//Documents", function(err){ 
    if (err)
        return console.error(err); 
}); 
fs.mkdir(pwd+"//Pictures", function(err){ 
    if (err)
        return console.error(err); 
}); 

for(let i in files)
{
    let file=files[i].split('\\').pop();
    let ext=file.split('.')[1]    

    if(txt.includes(ext))
        moveFiles(files[i],pwd+"\\Documents\\"+file)
    else if(pic.includes(ext))
        moveFiles(files[i],pwd+"\\Pictures\\"+file)
    else if(vid.includes(ext))
        moveFiles(files[i],pwd+"\\Video\\"+file)
    else if(aud.includes(ext))
        moveFiles(files[i],pwd+"\\Audio\\"+file)
}