// 比较 a、b 是否相等
export function isObjEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

// 获取格式为 yyyyMMdd 的日期
export function getYYMMDD(d = new Date()) {
  var date = new Date(d);
  //var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + '-' + month + '-' + strDate;
  return currentdate;
}

// 生成 uuid
export function getUUID() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 32; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

  var uuid = s.join("");
  return uuid;
}

// 根据图片 url 转出 base64
export function urlToBase64(url, type = 'image/jpeg') {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas');
    img.crossOrigin = '*';
    img.onload = function () {
      const width = img.width, height = img.height;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);
      const base64 = canvas.toDataURL(type);
      resolve(base64);
    };
    img.onerror = function (err) {
      reject(new Error(`message:${err}`));
    };
    img.src = url;
  });
}

/** 
 * 对象深拷贝
 * @param { p } 原对象
 * @param { r } 新对象 
 */

export function deepCopy(p, r) {

  var c = r || {};
  for (var i in p) {
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}

/** 
 * 导出 json 文件
 * @param { data } 文件内容，需 JSON.stringify 处理
 * @param { name } 文件名 
 */

export function exportJSON(data, name = 'json_data') {
  if (!data) return;
  var blob = new Blob([data], { type: "text/json" }),
    e = document.createEvent("MouseEvents"),
    a = document.createElement("a");
  a.download = `${name}_${new Date().getTime()}.json`;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  e.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
}

/** 
 * 导入 json 文件
 * @param { callSuccess } 成功的回调
 * @param { callFail } 失败的回调
 */

export function importJSON(callSuccess, callFail) {
  // 创建一个file input
  let input = document.createElement('input')
  input.type = 'file'

  // 绑定onchange事件
  input.onchange = (event) => {
    let files = event.target.files
    if (!files || !files.length) {
      input = null
      throw new Error('No files')
    }

    // 当选择文件后，使用FileReader API读取文件，返回数据
    let reader = new FileReader()
    reader.onload = (event) => {
      try {
        let config = JSON.parse(event.target.result)
        if (typeof callSuccess == 'function') callSuccess(config);
        return config
      } catch (e) {
        if (typeof callFail == 'function') callFail(e);
        throw new Error(e)
      } finally {
        input = null
      }
    }
    reader.readAsText(files[0])
  }

  // 触发上传文件
  input.click()
}