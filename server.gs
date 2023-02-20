function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('main.html').setTitle("網頁設計作業上傳網站");
}


function uploadFileToGoogleDrive(data, file, name, homeworkname,studentid,message) {
  UrlFetchApp.fetch('https://notify-api.line.me/api/notify',{
             'headers':{ 'Authorization': 'Bearer ' + 'Jj9QOpvhqs7WKOYapN0AIyeH2xhUWSGemn5LqDJSY2G' },
             'method': 'post',                           
    'payload': { 'message':"\n姓名:"+name+"\n系級與學號:"+studentid+ "\n上傳了作業:"+homeworkname+"\n上傳時間："+Date()+"\n給老師的留言:"+message}
         });
  try {
    
    var dropbox = "testjs";
    var folder, folders = DriveApp.getFoldersByName(dropbox);
    
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox);
    }
    
    /* Credit: www.labnol.org/awesome */
    
    var contentType = data.substring(5,data.indexOf(';')),
        bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7)),
        blob = Utilities.newBlob(bytes, contentType, file),
        file = folder.createFolder([name, studentid," 作業名:" ,homeworkname].join(" ")).createFile(blob);
    
    return "OK";
    
  } catch (f) {
    return f.toString();
  }
  
}