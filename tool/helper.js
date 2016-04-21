"use strict";

const fs = require("fs"),
      path = require('path');

/**
 * 读取某文件夹下的所有文件
 * @param  {string} dir   [需要遍历的文件夹名称]
 * @param  {int} level [需要查询的文件层级 默认所有]
 * @return {array}       [查询的文件列表集合]
 */
let walk = (dir, level) => {
  let results = [];
  let list = fs.readdirSync(dir);//readdirSync(path)返回一个包含“指定目录下所有文件夹名称和文件名称”的数组对象，node自带函数
  list.forEach((file) => {
    file = dir + '/' + file;
    let stat = fs.statSync(file);
    if(stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
    
  });
  return getFilesByLevel(dir, results, level);
} 

let walkDirectory = (dir,level)=> {
  let results = []
  let list = fs.readdirSync(dir)
  list.forEach((file)=> {
      file = dir + '/' + file
      var stat = fs.statSync(file)
      if (stat && stat.isDirectory()){
        results.push(file)
        results = results.concat(walkDirectory(file))
      }
  })

  return getFilesByLevel(dir, results, level)
}

/**
 * 过滤出指定层级的文件
 * @param  {string} files 要过滤的文件集合
 * @param  {integer} level 层级
 * @return {array}       新的文件集合
 */
let getFilesByLevel = (dir, files, level)=> {
  if (!level) return files;
  if (!/\/$/.test(dir)) dir += '/' 
  return files.filter((item)=> {
    return item.split(dir)[1].split('/').length === level
  })
}

module.exports = {
  walk: walk,
  walkDirectory: walkDirectory
}
