/*
 * Copyright (c) 2011.
 *
 * Author: oldj <oldj.wu@gmail.com>
 * Blog: http://oldj.net/
 *
 * Last Update: 2011/1/10 5:22:52
 */

// _TD.a.push begin
_TD.a.push(function (TD) {

	// 預先載入建築物圖片
	var buildingImages = {};
	var imagesLoaded = false;
	
	// 圖片列表
	var imageList = [
		{ type: "cannon", src: "images/cannon.png" },
		{ type: "LMG", src: "images/lmg.png" },
		{ type: "HMG", src: "images/hmg.png" },
		{ type: "laser_gun", src: "images/laser_gun.png" },
		{ type: "super_gun", src: "images/super_gun.png" },
		{ type: "wall", src: "images/wall.png" }
	];
	
	// 載入所有圖片
	function loadBuildingImages() {
		var imagesToLoad = imageList.length;
		var imagesLoadedCount = 0;
		
		imageList.forEach(function(item) {
			var img = new Image();
			img.onload = function() {
				imagesLoadedCount++;
				if (imagesLoadedCount === imagesToLoad) {
					imagesLoaded = true;
					TD.log("所有建築物圖片載入完成");
				}
			};
			img.onerror = function() {
				TD.log("載入圖片失敗: " + item.src);
				imagesLoadedCount++;
				// 即使圖片載入失敗，也繼續執行
				if (imagesLoadedCount === imagesToLoad) {
					imagesLoaded = true;
				}
			};
			img.src = item.src;
			buildingImages[item.type] = img;
		});
	}
	
	// 開始載入圖片
	loadBuildingImages();

	var renderFunctions = {
		"cannon": function (b, ctx, map, gs, gs2) {
			var target_position = b.getTargetPosition();
			
			// 如果有圖片就使用圖片，否則使用原始繪製
			if (imagesLoaded && buildingImages["cannon"]) {
				var img = buildingImages["cannon"];
				var imgSize = gs * 0.9; // 圖片大小為格子的90%
				ctx.drawImage(img, b.cx - imgSize/2, b.cy - imgSize/2, imgSize, imgSize);
			} else {
				// 原始繪製代碼作為備份
				ctx.fillStyle = "#393";
				ctx.strokeStyle = "#000";
				ctx.beginPath();
				ctx.lineWidth = _TD.retina;
				ctx.arc(b.cx, b.cy, gs2 - 5, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
			}
			
			// 炮管仍然用線條繪製（保持瞄準效果）
//			if (b.is_weapon && b.target) {
//				ctx.lineWidth = 3 * _TD.retina;
//				ctx.strokeStyle = "#000";
//				ctx.beginPath();
//				ctx.moveTo(b.cx, b.cy);
//				ctx.lineTo(target_position[0], target_position[1]);
//				ctx.stroke();
//			}
		},
		"LMG": function (b, ctx, map, gs, gs2) {
			var target_position = b.getTargetPosition();
			
			if (imagesLoaded && buildingImages["LMG"]) {
				var img = buildingImages["LMG"];
				var imgSize = gs * 0.8;
				ctx.drawImage(img, b.cx - imgSize/2, b.cy - imgSize/2, imgSize, imgSize);
			} else {
				ctx.fillStyle = "#36f";
				ctx.strokeStyle = "#000";
				ctx.beginPath();
				ctx.lineWidth = _TD.retina;
				ctx.arc(b.cx, b.cy, 7 * _TD.retina, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
			}
			
//			if (b.is_weapon && b.target) {
//				ctx.lineWidth = 2 * _TD.retina;
//				ctx.strokeStyle = "#000";
//				ctx.beginPath();
//				ctx.moveTo(b.cx, b.cy);
//				ctx.lineTo(target_position[0], target_position[1]);
//				ctx.stroke();
//			}
		},
		"HMG": function (b, ctx, map, gs, gs2) {
			var target_position = b.getTargetPosition();
			
			if (imagesLoaded && buildingImages["HMG"]) {
				var img = buildingImages["HMG"];
				var imgSize = gs * 0.9;
				ctx.drawImage(img, b.cx - imgSize/2, b.cy - imgSize/2, imgSize, imgSize);
			} else {
				ctx.fillStyle = "#933";
				ctx.strokeStyle = "#000";
				ctx.beginPath();
				ctx.lineWidth = _TD.retina;
				ctx.arc(b.cx, b.cy, gs2 - 2, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
			}
			
//			if (b.is_weapon && b.target) {
//				ctx.lineWidth = 5 * _TD.retina;
//				ctx.strokeStyle = "#000";
//				ctx.beginPath();
//				ctx.moveTo(b.cx, b.cy);
//				ctx.lineTo(target_position[0], target_position[1]);
//				ctx.stroke();
//			}
		},
		"laser_gun": function (b, ctx, map, gs, gs2) {
			if (imagesLoaded && buildingImages["laser_gun"]) {
				var img = buildingImages["laser_gun"];
				var imgSize = gs * 0.9;
				ctx.drawImage(img, b.cx - imgSize/2, b.cy - imgSize/2, imgSize, imgSize);
			} else {
				ctx.fillStyle = "#f00";
				ctx.strokeStyle = "#000";
				ctx.beginPath();
				ctx.lineWidth = _TD.retina;
				ctx.moveTo(b.cx, b.cy - 10 * _TD.retina);
				ctx.lineTo(b.cx - 8.66 * _TD.retina, b.cy + 5 * _TD.retina);
				ctx.lineTo(b.cx + 8.66 * _TD.retina, b.cy + 5 * _TD.retina);
				ctx.lineTo(b.cx, b.cy - 10 * _TD.retina);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
			}
			
			// 激光效果仍然保留
			if (b.type == "laser_gun" && b.target && b.target.is_valid) {
				ctx.lineWidth = 3 * _TD.retina;
				ctx.strokeStyle = "rgba(50, 50, 200, 0.4)";
				ctx.beginPath();
				ctx.moveTo(b.cx, b.cy);
				ctx.lineTo(b.target.cx, b.target.cy);
				ctx.stroke();
			}
		},
		"wall": function (b, ctx, map, gs, gs2) {
			if (imagesLoaded && buildingImages["wall"]) {
				var img = buildingImages["wall"];
				var imgSize = gs * 0.8;
//				ctx.drawImage(img, b.cx - gs2, b.cy - gs2, gs, gs);
				ctx.drawImage(img, b.cx - imgSize/2, b.cy - imgSize/2, imgSize, imgSize);
			} else {
				ctx.lineWidth = _TD.retina;
				ctx.fillStyle = "#666";
				ctx.strokeStyle = "#000";
				ctx.fillRect(b.cx - gs2 + 1, b.cy - gs2 + 1, gs - 1, gs - 1);
				ctx.beginPath();
				ctx.moveTo(b.cx - gs2 + 0.5, b.cy - gs2 + 0.5);
				ctx.lineTo(b.cx - gs2 + 0.5, b.cy + gs2 + 0.5);
				ctx.lineTo(b.cx + gs2 + 0.5, b.cy + gs2 + 0.5);
				ctx.lineTo(b.cx + gs2 + 0.5, b.cy - gs2 + 0.5);
				ctx.lineTo(b.cx - gs2 + 0.5, b.cy - gs2 + 0.5);
				ctx.moveTo(b.cx - gs2 + 0.5, b.cy + gs2 + 0.5);
				ctx.lineTo(b.cx + gs2 + 0.5, b.cy - gs2 + 0.5);
				ctx.moveTo(b.cx - gs2 + 0.5, b.cy - gs2 + 0.5);
				ctx.lineTo(b.cx + gs2 + 0.5, b.cy + gs2 + 0.5);
				ctx.closePath();
				ctx.stroke();
			}
		},
		"super_gun": function (b, ctx) {
			var retina = _TD.retina;
			
			if (imagesLoaded && buildingImages["super_gun"]) {
				var img = buildingImages["super_gun"];
				var imgSize = 24 * retina; // 菱形大小
				ctx.drawImage(img, b.cx - imgSize/2, b.cy - imgSize/2, imgSize, imgSize);
			} else {
				// 原始繪製代碼作為備份
				var size = 12 * retina;
				ctx.fillStyle = "#FFD700";
				ctx.strokeStyle = "#000";
				ctx.lineWidth = 2 * retina;
				ctx.beginPath();
				ctx.moveTo(b.cx, b.cy - size);
				ctx.lineTo(b.cx - size, b.cy);
				ctx.lineTo(b.cx, b.cy + size);
				ctx.lineTo(b.cx + size, b.cy);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();
				
				ctx.fillStyle = "#F00";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.font = "bold " + (14 * retina) + "px 'Arial'";
				ctx.fillText("S", b.cx, b.cy);
			}
			
			// super_gun 的攻擊效果
			if (b.type == "super_gun" && b.target && b.target.is_valid) {
				ctx.lineWidth = 4 * _TD.retina;
				ctx.strokeStyle = "rgba(255, 100, 100, 0.5)";
				ctx.beginPath();
				ctx.moveTo(b.cx, b.cy);
				ctx.lineTo(b.target.cx, b.target.cy);
				ctx.stroke();
			}
		}
	};

	TD.renderBuilding = function (building) {
		var ctx = TD.ctx,
			map = building.map,
			gs = TD.grid_size,
			gs2 = TD.grid_size / 2;

		(renderFunctions[building.type] || renderFunctions["wall"])(
			building, ctx, map, gs, gs2
		);
	}

}); // _TD.a.push end