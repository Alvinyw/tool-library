import { jsPDF } from "jspdf"; // https://artskydj.github.io/jsPDF/docs/index.html

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

/** 
 * 获取元素尺寸
 * @param { el } 元素
 */

export function getElDimensions(el) {
	var displayFormat, elDimensions;

	if (!el) return false;

	displayFormat = el.style.display;

	el.style.display = '';

	elDimensions =
	{
		clientTop: el.clientTop,
		clientLeft: el.clientLeft,
		clientWidth: el.clientWidth ? el.clientWidth : (parseInt(el.style.width) ? parseInt(el.style.width) : 0),
		clientHeight: el.clientHeight ? el.clientHeight : (parseInt(el.style.height) ? parseInt(el.style.height) : 0)
	};

	el.style.display = displayFormat;

	return elDimensions;
}

/** 
 * 是否为数字
 * @param { val } 入参
 */

export function isNumber(val) {
	if (val === "" || val == null) {
		return false;
	}
	if (!isNaN(val)) {
		return true;
	} else {
		return false;
	}
}

/** 
 * 是否为空
 * @param { exp } 入参
 */

export function isUndefined(exp) {
	if (typeof (exp) == "undefined") {
		return true;
	}
	return false;
}

/** 
 * 是否为函数
 * @param { _fun } 入参
 */

export function isFunction(_fun) {
	return _fun && typeof (_fun) === 'function';
}

/** 
 * base64 转 blob
 * @param { base64Str } base64 格式图片
 * @param { mimeType } 原图类型
 */

export function convertBase64ToBlob(base64Str, mimeType) {
	var byteCharacters = window.atob(base64Str);
	var byteNumArr = new Array(byteCharacters.length);
	for (var i = 0; i < byteCharacters.length; ++i) {
		byteNumArr[i] = byteCharacters.charCodeAt(i);
	}
	var uint8Arr = new Uint8Array(byteNumArr);
	return new Blob([uint8Arr], { type: mimeType });
}

/** 
 * URL 转 blob
 * @param { url } 原图 URL
 * @param { callback } 回调
 */

export function convertURLToBlob(url, callback) {
	var http = new XMLHttpRequest();
	http.open("GET", url, true);
	http.responseType = "blob";
	http.onloadend = function () {
		callback(this.response);
	};
	http.send();
}

/** 
 * canvas 转 blob
 * @param { cvs } canvas 原属
 * @param { callback } 回调函数
 * @param { mimeType } 图片类型
 * @param { quality } 文件质量
 */

export function canvasToBlob(cvs, callback, mimeType, quality) {
	if (cvs.toBlob) {
		cvs.toBlob(callback, mimeType, quality);
	} else {
		var b64str = cvs.toDataURL(mimeType, quality);
		var blob = convertBase64ToBlob(b64str.substring(b64str.indexOf(",") + 1), mimeType);
		callback(blob);
	}
}

/** 
 * 将任意格式的图片转换成 blob 格式
 * @param { imgData } 原图
 * @param { callback } 回调
 */

export function getBlobFromAnyImgData(imgData, callback) {
	if (imgData instanceof Blob) {
		callback(imgData);
	} else if (imgData instanceof HTMLCanvasElement) {
		canvasToBlob(imgData, function (blob) {
			callback(blob);
		});
	} else if (typeof imgData == "string" || imgData instanceof String) {
		var url = imgData;
		if ("data:" == url.substring(0, 5)) { // url is base64
			var mimeType = "";
			if ("image/" == url.substring(5, 11)) {
				mimeType = url.substring(5, url.indexOf(";", 11));
			}
			var blob = convertBase64ToBlob(url.substring(url.indexOf("base64,") + 7), mimeType);
			callback(blob);
		} else { // url is link, such as 'https://....'
			convertURLToBlob(url, function (blob) {
				callback(blob);
			});
		}
	} else if (imgData instanceof HTMLImageElement) {
		var src;
		//src maybe access denied
		try {
			src = imgData.src;
		} catch (ex) {
			setTimeout(function () {
				throw (ex);
			}, 0);
			callback(null, '');
			return;
		}

		// url not available, maybe network problem
		// use imgData -> canvas -> blob instand 
		var tCvs = document.createElement('canvas');
		tCvs.width = imgData.naturalWidth;
		tCvs.height = imgData.naturalHeight;
		var ctx = tCvs.getContext('2d');
		ctx.drawImage(imgData, 0, 0);

		// use suffix guess image mime type
		var suffix = "";
		var questionPos = src.lastIndexOf("?");
		var dotPos = -1;
		if (-1 != questionPos) {
			dotPos = src.lastIndexOf(".", questionPos);
			if (-1 != dotPos && questionPos - dotPos <= 5) { //max supported type suffix is 4
				suffix = src.substring(dotPos + 1, questionPos);
			}
		} else {
			dotPos = src.lastIndexOf(".");
			if (-1 != dotPos) {
				if (src.length - dotPos <= 5) { //max supported type suffix is 4
					suffix = src.substring(dotPos + 1);
				} else {
					suffix = src.substring(dotPos + 1, dotPos + 5);
				}
			}
		}
		var saveFormat;
		if (-1 != suffix.indexOf("webp")) {
			saveFormat = "image/webp";
		} else if (-1 != suffix.indexOf("png") || -1 != suffix.indexOf("gif") || -1 != suffix.indexOf("svg")) {
			saveFormat = "image/png";
		} else { // like jpeg
			saveFormat = "image/jpeg";
		}

		canvasToBlob(tCvs, function (blob) {
			callback(blob);
		}, saveFormat);

	} else {
		//not support
		callback(null);
	}

}

/**
 * 获取图片的宽高
 * @param { src } 图片地址
*/
export function getImgWidthHeight(src) {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.src = src
		// 图片是否有缓存 如果有缓存可以直接拿 如果没有缓存 需要从onload拿
		if (img.complete) {
			const { width, height } = img
			resolve({
				width,
				height,
			})
		} else {
			img.onload = function () {
				const { width, height } = img
				resolve({
					width,
					height,
				})
			}
		}
	})
}

/**
 * 获取图片最大宽度和高度
 * @param { imagesSrcList } 图片地址列表
*/
export async function getMaxWidthHeight(imagesSrcList = []) {
	if (!imagesSrcList || !Array.isArray(imagesSrcList)) return;
	const widthList = []
	const heightList = []
	let maxHeight = 0
	let maxWidth = 0
	for (let i = 0; i < imagesSrcList.length; i++) {
		const { width, height } = await getImgWidthHeight(imagesSrcList[i])
		widthList.push(width)
		heightList.push(height)
	}
	// 把数组变成升序然后倒过来取第一个就是拿最大宽度
	maxWidth = widthList.sort().reverse()[0]
	maxHeight = heightList.sort().reverse()[0]
	return {
		maxWidth,
		maxHeight,
	}
}

/**
 * 将图片下载为 pdf
 * @param { blobFileAry } 图片地址列表
 * @param { type } 图片类型
 * 参考文章：https://www.jianshu.com/p/43d69b8ff8e8
 * 参考文章：https://artskydj.github.io/jsPDF/docs/module-addImage.html#~addImage
 */
export async function downloadPdf(blobFileAry = [], type = 'PNG') {
	if (!blobFileAry || !Array.isArray(blobFileAry)) return;
	// const { maxWidth, maxHeight } = await getMaxWidthHeight(blobFileAry)
	// A4纸的尺寸是210毫米×297毫米
	// 当分辨率是72像素/英寸时，A4纸长宽像素分别是842×595;
	// 当分辨率是150像素/英寸时，A4纸长宽像素分别是1754×1240;
	// 当分辨率是300像素/英寸时，A4纸长宽像素分别是3508×2479。
	const maxHeight = 842;
	const maxWidth = 595;
	const _rate = maxWidth / maxHeight;
	const doc = new jsPDF('p', 'px', [maxWidth, maxHeight]);

	// 从top的位置开始加图片
	for (let i = 0; i < blobFileAry.length; i++) {
		const { width, height } = await getImgWidthHeight(blobFileAry[i])
		var _w = width * _rate;
		var _h = height * _rate;
		var _c = 1;
		if (_w > maxWidth*0.9) {
			_c = maxWidth*0.9 / _w;
			_w = maxWidth*0.9;
			_h = _c * _h;
		}
		if (_h > maxHeight*0.9) {
			const _c2 = maxHeight*0.9 / _h;
			_h = maxHeight*0.9;
			_w = _w * _c2;
			_c = _c * _c2;
		}
		doc.addImage(blobFileAry[i], type, (maxWidth - _w) / 2, (maxHeight - _h) / 2, _w, _h, '', _c)
		doc.addPage([maxWidth, maxHeight])
	}
	// 删除最后一页留白
	const targetPage = doc.internal.getNumberOfPages()
	doc.deletePage(targetPage)
	doc.save(`${(new Date()).getTime()}.pdf`);
}

/**
 * 将base64格式的图片下载为txt文件
 * @param { base64File } base64格式的图片源
 * */
export function downloadBase64ToTxt(base64File = '') {
	if (!base64File) return;
	// dada 表示要转换的字符串数据，type 表示要转换的数据格式
	const blob = new Blob([base64File], {
		type: "text/plain;charset=utf-8"
	})
	// 根据 blob生成 url链接
	const objectURL = URL.createObjectURL(blob)

	// 创建一个 a 标签Tag
	const aTag = document.createElement('a')
	// 设置文件的下载地址
	aTag.href = objectURL
	// 设置保存后的文件名称
	aTag.download = `${(new Date()).getTime()}.txt`;
	// 给 a 标签添加点击事件
	aTag.click()
	// 释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
	// 当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
	URL.revokeObjectURL(objectURL)
}

/**
 * 将blob格式的图片下载为图片
 * @param { blobFile } blob 图片数据
 * @param { type } 图片类型
*/
export function downloadImg(blobFile = '', type = 'PNG') {
	if (!blobFile) return;
	var a = document.createElement('a');
	a.target = '_blank';
	a.download = (new Date()).getTime() + `.${type}`;
	var objUrl = blobFile;
	a.href = objUrl;
	var ev = new MouseEvent('click', {
		"view": window,
		"bubbles": true,
		"cancelable": false
	});
	a.dispatchEvent(ev);
	//a.click();
	setTimeout(function () {
		URL.revokeObjectURL(objUrl);
	}, 10000);

}

/**
 * 计算base64格式图片的大小，单位M
 * @param { base64 } base64格式的图片源
 * @returns 返回传入的base64图片的大小
 */
export function calcBase64Size(base64) {
	if (!base64) return 0;
	var _idx = base64.indexOf('base64,') + 7;
	var str = base64.substring(_idx)
	var enqualIndex = str.indexOf('=')
	if (enqualIndex > 0) {
		str = str.substring(0, enqualIndex)
	}
	var strLength = str.length
	var fileLength = parseInt(strLength - (strLength / 8) * 2)
	var size = (fileLength / 1024 / 1024).toFixed(2)
	var sizeStr = size + ''
	var index = sizeStr.indexOf('.')
	var dou = sizeStr.substr(index + 1, 2)
	if (dou == '00') {
		return Number(sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2))
	}
	return Number(size)
}

/**
 * 前端图片压缩
 * @param { src } 需要被压缩的原图片，建议传入base64格式的图片源
 * @param { callBack } 压缩成功后的回调函数
 * @param { maxSize } 图片压缩后的size上限，默认为1M
 * @param { scale } 图片的压缩比例，默认为0.9
 * @returns 返回回调函数的执行，参数为压缩至2M以下的图片
 */

export function compressionImage(src, callBack, maxSize = 1, scale = 0.9) {
	const imgSize = calcBase64Size(src)
	if (maxSize > imgSize) {
		return callBack(src);
	}
	let _scale = scale;
	if (imgSize > maxSize) {
		try {
			var img = new Image()
			img.src = src
			img.onload = function () {
				var _this = this
				let canvas = document.createElement('canvas')
				let ctx = canvas.getContext('2d')
				let width = _this.width * _scale
				let height = _this.height * _scale
				canvas.width = width
				canvas.height = height
				ctx.fillStyle = '#fff'
				ctx.fillRect(0, 0, width, height)
				ctx.drawImage(img, 0, 0, width, height)
				let newSrc = canvas.toDataURL('image/png', _scale)
				if (calcBase64Size(newSrc) < maxSize) {
					callBack(src)
				} else {
					compressionImage(newSrc, callBack, maxSize)
				}
			}
			img.onerror = function () {
				console.log('图片压缩img.onload报错，图片src：', img.src)
			}
		} catch (error) {
			console.log('图片压缩失败，图片src：', error)
			callBack(src)
		}
	} else {
		callBack(src)
	}
}
