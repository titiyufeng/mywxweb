// miniprogram/pages/orderdetail/orderdetail.js
Page({
  data: {},
  onLoad: function(options) {
    console.log(wx.env.USER_DATA_PATH)
    var filePath = wx.env.USER_DATA_PATH + "/a.txt"
    console.log(filePath)
    var FileSystemManager = wx.getFileSystemManager()
    // FileSystemManager.writeFileSync(filePath, "4567890")
    var data = FileSystemManager.readFileSync(filePath)
    console.log(data)
    // console.log(data.get)

    let unit8Arr = new Uint8Array(data);

    var encodedString = String.fromCharCode.apply(null, unit8Arr)
    console.log(encodedString);
    var decodedString = decodeURIComponent(escape((encodedString))); //没有这一步中文会乱码
    console.log(decodedString);
  }
})