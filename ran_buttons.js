//	---------------------
//	NAVIGATION
//	---------------------
	
	function draw_primaryNav_navigate(lctx, fill){
	
		lctx.fillStyle = fill;
		lctx.strokeStyle = fill;
		
		// navigate/Path
		lctx.save();
		lctx.beginPath();
		lctx.moveTo(24.0, 0.0);
		lctx.lineTo(29.0, 19.0);
		lctx.lineTo(24.0, 24.0);
		lctx.lineTo(24.0, 0.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 0.0);
		lctx.lineTo(19.0, 19.0);
		lctx.lineTo(24.0, 24.0);
		lctx.lineTo(24.0, 0.0);
		lctx.closePath();
		lctx.lineWidth = 0.3;
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(10.0, 10.0);
		lctx.lineTo(19.0, 19.0);
		lctx.lineTo(15.0, 20.0);
		lctx.lineTo(10.0, 10.0);
		lctx.closePath();
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(10.0, 38.0);
		lctx.lineTo(19.0, 29.0);
		lctx.lineTo(20.0, 33.0);
		lctx.lineTo(10.0, 38.0);
		lctx.closePath();
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 48.0);
		lctx.lineTo(29.0, 29.0);
		lctx.lineTo(24.0, 24.0);
		lctx.lineTo(24.0, 48.0);
		lctx.closePath();
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(48.0, 24.0);
		lctx.lineTo(29.0, 19.0);
		lctx.lineTo(24.0, 24.0);
		lctx.lineTo(48.0, 24.0);
		lctx.closePath();
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(0.0, 24.0);
		lctx.lineTo(19.0, 29.0);
		lctx.lineTo(24.0, 24.0);
		lctx.lineTo(0.0, 24.0);
		lctx.closePath();
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 24.0);
		lctx.lineTo(48.0, 24.0);
		lctx.lineTo(29.0, 29.0);
		lctx.lineTo(24.0, 24.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 24.0);
		lctx.lineTo(24.0, 48.0);
		lctx.lineTo(19.0, 29.0);
		lctx.lineTo(24.0, 24.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 24.0);
		lctx.lineTo(0.0, 24.0);
		lctx.lineTo(19.0, 19.0);
		lctx.lineTo(24.0, 24.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(20.0, 15.0);
		lctx.lineTo(10.0, 10.0);
		lctx.lineTo(19.0, 19.0);
		lctx.lineTo(20.0, 15.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(15.0, 28.0);
		lctx.lineTo(10.0, 38.0);
		lctx.lineTo(19.0, 29.0);
		lctx.lineTo(15.0, 28.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(28.0, 33.0);
		lctx.lineTo(38.0, 38.0);
		lctx.lineTo(29.0, 29.0);
		lctx.lineTo(28.0, 33.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(33.0, 20.0);
		lctx.lineTo(38.0, 10.0);
		lctx.lineTo(29.0, 19.0);
		lctx.lineTo(33.0, 20.0);
		lctx.closePath();
		lctx.fill();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(29.0, 19.0);
		lctx.lineTo(38.0, 10.0);
		lctx.lineTo(28.0, 15.0);
		lctx.lineTo(29.0, 19.0);
		lctx.closePath();
		lctx.stroke();

		// navigate/Path
		lctx.beginPath();
		lctx.moveTo(38.0, 38.0);
		lctx.lineTo(29.0, 29.0);
		lctx.lineTo(33.0, 28.0);
		lctx.lineTo(38.0, 38.0);
		lctx.closePath();
		lctx.stroke();
		lctx.restore();
	}
	
	function draw_primaryNav_character(lctx, fill){
	
		lctx.fillStyle = fill;
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(13.6, 17.2);
		lctx.lineTo(13.6, 19.6);
		lctx.lineTo(8.9, 19.6);
		lctx.lineTo(8.9, 17.9);
		lctx.bezierCurveTo(7.6, 19.2, 6.2, 19.8, 4.6, 19.8);
		lctx.bezierCurveTo(3.4, 19.8, 2.3, 19.4, 1.4, 18.6);
		lctx.bezierCurveTo(0.5, 17.8, 0.0, 16.7, 0.0, 15.5);
		lctx.bezierCurveTo(0.0, 14.2, 0.5, 13.2, 1.5, 12.3);
		lctx.bezierCurveTo(2.4, 11.5, 3.6, 11.1, 5.0, 11.1);
		lctx.bezierCurveTo(6.2, 11.1, 7.5, 11.5, 8.7, 12.2);
		lctx.lineTo(8.7, 10.9);
		lctx.bezierCurveTo(8.7, 10.2, 8.6, 9.7, 8.5, 9.3);
		lctx.bezierCurveTo(8.3, 8.9, 8.0, 8.6, 7.5, 8.3);
		lctx.bezierCurveTo(7.1, 8.0, 6.4, 7.8, 5.7, 7.8);
		lctx.bezierCurveTo(4.3, 7.8, 3.3, 8.4, 2.7, 9.4);
		lctx.lineTo(0.2, 8.7);
		lctx.bezierCurveTo(1.3, 6.6, 3.3, 5.6, 6.1, 5.6);
		lctx.bezierCurveTo(7.1, 5.6, 8.0, 5.7, 8.7, 6.0);
		lctx.bezierCurveTo(9.5, 6.3, 10.0, 6.6, 10.4, 7.1);
		lctx.bezierCurveTo(10.7, 7.5, 11.0, 8.0, 11.1, 8.5);
		lctx.bezierCurveTo(11.2, 9.0, 11.3, 9.8, 11.3, 10.9);
		lctx.lineTo(11.3, 17.2);
		lctx.lineTo(13.6, 17.2);
		lctx.closePath();

		// character/Compound Path/Path
		lctx.moveTo(8.7, 14.5);
		lctx.bezierCurveTo(7.5, 13.6, 6.3, 13.2, 5.2, 13.2);
		lctx.bezierCurveTo(4.4, 13.2, 3.8, 13.4, 3.3, 13.8);
		lctx.bezierCurveTo(2.8, 14.2, 2.6, 14.8, 2.6, 15.5);
		lctx.bezierCurveTo(2.6, 16.1, 2.8, 16.6, 3.2, 17.1);
		lctx.bezierCurveTo(3.7, 17.5, 4.2, 17.7, 5.0, 17.7);
		lctx.bezierCurveTo(6.3, 17.7, 7.5, 17.2, 8.7, 16.1);
		lctx.lineTo(8.7, 14.5);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(16.0, 19.6);
		lctx.lineTo(16.0, 17.2);
		lctx.lineTo(18.4, 17.2);
		lctx.lineTo(18.4, 2.4);
		lctx.lineTo(16.0, 2.4);
		lctx.lineTo(16.0, 0.0);
		lctx.lineTo(21.0, 0.0);
		lctx.lineTo(21.0, 7.9);
		lctx.bezierCurveTo(22.4, 6.3, 24.0, 5.6, 26.0, 5.6);
		lctx.bezierCurveTo(27.8, 5.6, 29.4, 6.2, 30.7, 7.5);
		lctx.bezierCurveTo(32.0, 8.8, 32.6, 10.5, 32.6, 12.6);
		lctx.bezierCurveTo(32.6, 14.6, 32.0, 16.3, 30.7, 17.7);
		lctx.bezierCurveTo(29.5, 19.1, 27.9, 19.8, 26.0, 19.8);
		lctx.bezierCurveTo(24.9, 19.8, 23.9, 19.6, 23.0, 19.1);
		lctx.bezierCurveTo(22.1, 18.6, 21.4, 18.1, 21.0, 17.5);
		lctx.lineTo(21.0, 19.6);
		lctx.lineTo(16.0, 19.6);
		lctx.closePath();

		// character/Compound Path/Path
		lctx.moveTo(21.1, 12.8);
		lctx.bezierCurveTo(21.1, 14.2, 21.6, 15.3, 22.4, 16.2);
		lctx.bezierCurveTo(23.3, 17.0, 24.3, 17.4, 25.4, 17.4);
		lctx.bezierCurveTo(26.6, 17.4, 27.6, 17.0, 28.5, 16.1);
		lctx.bezierCurveTo(29.4, 15.2, 29.8, 14.0, 29.8, 12.5);
		lctx.bezierCurveTo(29.8, 11.1, 29.4, 10.0, 28.5, 9.2);
		lctx.bezierCurveTo(27.7, 8.4, 26.6, 8.0, 25.5, 8.0);
		lctx.bezierCurveTo(24.4, 8.0, 23.3, 8.4, 22.5, 9.2);
		lctx.bezierCurveTo(21.6, 10.1, 21.1, 11.2, 21.1, 12.8);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(47.6, 5.8);
		lctx.lineTo(47.6, 10.9);
		lctx.lineTo(45.2, 10.9);
		lctx.bezierCurveTo(45.1, 9.9, 44.6, 9.2, 44.0, 8.7);
		lctx.bezierCurveTo(43.3, 8.1, 42.5, 7.9, 41.6, 7.9);
		lctx.bezierCurveTo(40.4, 7.9, 39.4, 8.3, 38.7, 9.2);
		lctx.bezierCurveTo(37.9, 10.0, 37.5, 11.1, 37.5, 12.5);
		lctx.bezierCurveTo(37.5, 13.8, 37.9, 14.9, 38.6, 15.9);
		lctx.bezierCurveTo(39.3, 16.9, 40.4, 17.4, 41.7, 17.4);
		lctx.bezierCurveTo(43.6, 17.4, 44.9, 16.5, 45.8, 14.7);
		lctx.lineTo(48.0, 15.7);
		lctx.bezierCurveTo(46.8, 18.4, 44.6, 19.8, 41.6, 19.8);
		lctx.bezierCurveTo(39.4, 19.8, 37.7, 19.1, 36.5, 17.6);
		lctx.bezierCurveTo(35.3, 16.1, 34.6, 14.4, 34.6, 12.5);
		lctx.bezierCurveTo(34.6, 10.4, 35.3, 8.7, 36.7, 7.4);
		lctx.bezierCurveTo(38.0, 6.1, 39.6, 5.4, 41.3, 5.4);
		lctx.bezierCurveTo(42.9, 5.4, 44.1, 5.8, 45.2, 6.7);
		lctx.lineTo(45.2, 5.8);
		lctx.lineTo(47.6, 5.8);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(7.8, 33.0);
		lctx.lineTo(5.1, 36.0);
		lctx.lineTo(6.9, 36.0);
		lctx.lineTo(6.9, 38.4);
		lctx.lineTo(0.3, 38.4);
		lctx.lineTo(0.3, 36.0);
		lctx.lineTo(2.3, 36.0);
		lctx.lineTo(6.3, 31.4);
		lctx.lineTo(2.4, 27.2);
		lctx.lineTo(0.6, 27.2);
		lctx.lineTo(0.6, 24.8);
		lctx.lineTo(7.0, 24.8);
		lctx.lineTo(7.0, 27.2);
		lctx.lineTo(5.3, 27.2);
		lctx.lineTo(7.7, 29.8);
		lctx.lineTo(10.1, 27.2);
		lctx.lineTo(8.7, 27.2);
		lctx.lineTo(8.7, 24.8);
		lctx.lineTo(15.2, 24.8);
		lctx.lineTo(15.2, 27.2);
		lctx.lineTo(12.9, 27.2);
		lctx.lineTo(9.2, 31.4);
		lctx.lineTo(13.4, 36.0);
		lctx.lineTo(15.2, 36.0);
		lctx.lineTo(15.2, 38.4);
		lctx.lineTo(8.7, 38.4);
		lctx.lineTo(8.7, 36.0);
		lctx.lineTo(10.6, 36.0);
		lctx.lineTo(7.8, 33.0);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(25.0, 38.2);
		lctx.lineTo(20.5, 27.2);
		lctx.lineTo(18.3, 27.2);
		lctx.lineTo(18.3, 24.8);
		lctx.lineTo(25.0, 24.8);
		lctx.lineTo(25.0, 27.2);
		lctx.lineTo(23.4, 27.2);
		lctx.lineTo(26.3, 34.7);
		lctx.lineTo(29.2, 27.2);
		lctx.lineTo(27.4, 27.2);
		lctx.lineTo(27.4, 24.8);
		lctx.lineTo(34.0, 24.8);
		lctx.lineTo(34.0, 27.2);
		lctx.lineTo(32.0, 27.2);
		lctx.lineTo(25.2, 44.5);
		lctx.lineTo(20.7, 44.5);
		lctx.lineTo(20.7, 42.2);
		lctx.lineTo(23.4, 42.2);
		lctx.lineTo(25.0, 38.2);
		lctx.closePath();
		lctx.fill();

		// character/Compound Path
		lctx.beginPath();

		// character/Compound Path/Path
		lctx.moveTo(36.3, 38.4);
		lctx.lineTo(36.3, 36.2);
		lctx.lineTo(44.8, 27.0);
		lctx.lineTo(39.2, 27.0);
		lctx.lineTo(39.2, 29.6);
		lctx.lineTo(36.9, 29.6);
		lctx.lineTo(36.9, 24.8);
		lctx.lineTo(48.0, 24.8);
		lctx.lineTo(48.0, 27.2);
		lctx.lineTo(39.4, 36.2);
		lctx.lineTo(45.7, 36.2);
		lctx.lineTo(45.7, 33.4);
		lctx.lineTo(48.0, 33.4);
		lctx.lineTo(48.0, 38.4);
		lctx.lineTo(36.3, 38.4);
		lctx.closePath();
		lctx.fill();
	}
	
	function draw_primaryNav_layers(lctx, fill){
	
		lctx.fillStyle = fill;
		
		// shapes/Path
		lctx.save();
		lctx.beginPath();
		lctx.moveTo(24.0, 21.0);
		lctx.lineTo(0.0, 10.5);
		lctx.lineTo(24.0, 0.0);
		lctx.lineTo(48.0, 10.5);
		lctx.lineTo(24.0, 21.0);
		lctx.closePath();
		lctx.fill();

		// shapes/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 30.0);
		lctx.lineTo(0.0, 19.5);
		lctx.lineTo(8.0, 16.0);
		lctx.lineTo(24.0, 23.0);
		lctx.lineTo(40.0, 16.0);
		lctx.lineTo(48.0, 19.5);
		lctx.lineTo(24.0, 30.0);
		lctx.closePath();
		lctx.fill();

		// shapes/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 39.0);
		lctx.lineTo(0.0, 28.5);
		lctx.lineTo(8.0, 25.0);
		lctx.lineTo(24.0, 32.0);
		lctx.lineTo(40.0, 25.0);
		lctx.lineTo(48.0, 28.5);
		lctx.lineTo(24.0, 39.0);
		lctx.closePath();
		lctx.fill();

		// shapes/Path
		lctx.beginPath();
		lctx.moveTo(24.0, 48.0);
		lctx.lineTo(0.0, 37.5);
		lctx.lineTo(8.0, 34.0);
		lctx.lineTo(24.0, 41.0);
		lctx.lineTo(40.0, 34.0);
		lctx.lineTo(48.0, 37.5);
		lctx.lineTo(24.0, 48.0);
		lctx.closePath();
		lctx.fill();
		lctx.restore();
	}
	
	function draw_primaryNav_attributes(lctx, fill){
	
		lctx.fillStyle = fill;
		
		// attributesActions/Path
		lctx.save();
		lctx.beginPath();
		lctx.moveTo(34.0, 14.0);
		lctx.lineTo(32.0, 14.0);
		lctx.lineTo(32.0, 48.0);
		lctx.lineTo(34.0, 48.0);
		lctx.lineTo(34.0, 14.0);
		lctx.lineTo(34.0, 14.0);
		lctx.closePath();
		lctx.fill();

		// attributesActions/Path
		lctx.beginPath();
		lctx.moveTo(2.0, 14.0);
		lctx.lineTo(0.0, 14.0);
		lctx.lineTo(0.0, 48.0);
		lctx.lineTo(2.0, 48.0);
		lctx.lineTo(2.0, 14.0);
		lctx.lineTo(2.0, 14.0);
		lctx.closePath();
		lctx.fill();

		// attributesActions/Path
		lctx.beginPath();
		lctx.moveTo(34.0, 14.0);
		lctx.lineTo(0.0, 14.0);
		lctx.lineTo(0.0, 16.0);
		lctx.lineTo(34.0, 16.0);
		lctx.lineTo(34.0, 14.0);
		lctx.lineTo(34.0, 14.0);
		lctx.closePath();
		lctx.fill();

		// attributesActions/Path
		lctx.beginPath();
		lctx.moveTo(34.0, 46.0);
		lctx.lineTo(0.0, 46.0);
		lctx.lineTo(0.0, 48.0);
		lctx.lineTo(34.0, 48.0);
		lctx.lineTo(34.0, 46.0);
		lctx.lineTo(34.0, 46.0);
		lctx.closePath();
		lctx.fill();

		// attributesActions/Check
		lctx.beginPath();
		lctx.moveTo(3.0, 27.4);
		lctx.lineTo(19.1, 45.0);
		lctx.lineTo(47.0, 11.3);
		lctx.lineTo(41.1, 1.0);
		lctx.lineTo(19.1, 33.3);
		lctx.lineTo(8.9, 20.1);
		lctx.lineTo(3.0, 27.4);
		lctx.closePath();
		lctx.fill();
		lctx.restore();
	}

	function draw_primaryNav_save(lctx, fill){
	
		lctx.fillStyle = fill;
		
		// save/Path
		lctx.save();
		lctx.beginPath();
		lctx.moveTo(18.0, 27.0);
		lctx.lineTo(19.0, 27.0);
		lctx.lineTo(19.0, 32.0);
		lctx.lineTo(18.0, 32.0);
		lctx.lineTo(18.0, 27.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(32.0, 16.0);
		lctx.lineTo(36.0, 16.0);
		lctx.lineTo(36.0, 18.0);
		lctx.lineTo(32.0, 18.0);
		lctx.lineTo(32.0, 16.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(18.0, 12.0);
		lctx.lineTo(20.0, 12.0);
		lctx.lineTo(20.0, 23.0);
		lctx.lineTo(18.0, 23.0);
		lctx.lineTo(18.0, 12.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(28.0, 12.0);
		lctx.lineTo(30.0, 12.0);
		lctx.lineTo(30.0, 23.0);
		lctx.lineTo(28.0, 23.0);
		lctx.lineTo(28.0, 12.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(18.0, 22.0);
		lctx.lineTo(30.0, 22.0);
		lctx.lineTo(30.0, 24.0);
		lctx.lineTo(18.0, 24.0);
		lctx.lineTo(18.0, 22.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(21.0, 27.0);
		lctx.lineTo(30.0, 27.0);
		lctx.lineTo(30.0, 32.0);
		lctx.lineTo(21.0, 32.0);
		lctx.lineTo(21.0, 27.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(18.0, 27.0);
		lctx.lineTo(29.0, 27.0);
		lctx.lineTo(29.0, 28.0);
		lctx.lineTo(18.0, 28.0);
		lctx.lineTo(18.0, 27.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(18.0, 31.0);
		lctx.lineTo(29.0, 31.0);
		lctx.lineTo(29.0, 32.0);
		lctx.lineTo(18.0, 32.0);
		lctx.lineTo(18.0, 31.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(17.0, 34.0);
		lctx.lineTo(14.0, 31.0);
		lctx.lineTo(14.0, 14.0);
		lctx.lineTo(36.0, 14.0);
		lctx.lineTo(36.0, 12.0);
		lctx.lineTo(12.0, 12.0);
		lctx.lineTo(12.0, 31.8);
		lctx.lineTo(16.2, 36.0);
		lctx.lineTo(36.0, 36.0);
		lctx.lineTo(36.0, 34.0);
		lctx.lineTo(17.0, 34.0);
		lctx.closePath();
		lctx.fill();

		// save/Path
		lctx.beginPath();
		lctx.moveTo(36.0, 12.0);
		lctx.lineTo(34.0, 12.0);
		lctx.lineTo(34.0, 14.0);
		lctx.lineTo(34.0, 34.0);
		lctx.lineTo(34.0, 36.0);
		lctx.lineTo(36.0, 36.0);
		lctx.lineTo(36.0, 12.0);
		lctx.closePath();
		lctx.fill();
		lctx.restore();
	}

	
//	---------------------
//	TOOLS
//	---------------------

function drawNewPathButton(lctx, bgcolor, outlinecolor){
	// newPath/BG
	lctx.fillStyle = bgcolor;

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(8.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(10.0, 6.0);
	lctx.lineTo(10.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 4.0);
	lctx.lineTo(9.0, 4.0);
	lctx.lineTo(9.0, 3.0);
	lctx.lineTo(10.0, 3.0);
	lctx.lineTo(10.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(0.0, 2.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 8.0);
	lctx.lineTo(11.0, 8.0);
	lctx.lineTo(11.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 6.0);
	lctx.lineTo(9.0, 6.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(10.0, 5.0);
	lctx.lineTo(10.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 6.0);
	lctx.lineTo(1.0, 6.0);
	lctx.lineTo(1.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 10.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(2.0, 7.0);
	lctx.lineTo(4.0, 7.0);
	lctx.lineTo(4.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 11.0);
	lctx.lineTo(3.0, 11.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(5.0, 10.0);
	lctx.lineTo(5.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newPath/BG/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 5.0);
	lctx.lineTo(1.0, 5.0);
	lctx.lineTo(1.0, 2.0);
	lctx.lineTo(9.0, 2.0);
	lctx.lineTo(9.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline
	lctx.fillStyle = outlinecolor;

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 15.0);
	lctx.lineTo(7.0, 15.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(12.0, 14.0);
	lctx.lineTo(12.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 17.0);
	lctx.lineTo(9.0, 17.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(10.0, 12.0);
	lctx.lineTo(10.0, 17.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(9.0, 2.0);
	lctx.lineTo(9.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(0.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(0.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 6.0);
	lctx.lineTo(9.0, 6.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 7.0);
	lctx.lineTo(4.0, 7.0);
	lctx.lineTo(4.0, 6.0);
	lctx.lineTo(2.0, 6.0);
	lctx.lineTo(2.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 11.0);
	lctx.lineTo(8.0, 11.0);
	lctx.lineTo(8.0, 10.0);
	lctx.lineTo(5.0, 10.0);
	lctx.lineTo(5.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 3.0);
	lctx.lineTo(10.0, 3.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(9.0, 2.0);
	lctx.lineTo(9.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 4.0);
	lctx.lineTo(11.0, 4.0);
	lctx.lineTo(11.0, 3.0);
	lctx.lineTo(10.0, 3.0);
	lctx.lineTo(10.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 10.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(2.0, 7.0);
	lctx.lineTo(1.0, 7.0);
	lctx.lineTo(1.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 5.0);
	lctx.lineTo(10.0, 5.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(9.0, 4.0);
	lctx.lineTo(9.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 11.0);
	lctx.lineTo(3.0, 11.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(2.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(12.0, 11.0);
	lctx.lineTo(12.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newPath/Outline/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 12.0);
	lctx.lineTo(5.0, 12.0);
	lctx.lineTo(5.0, 11.0);
	lctx.lineTo(3.0, 11.0);
	lctx.lineTo(3.0, 12.0);
	lctx.closePath();
	lctx.fill();
}

function drawNewOvalButton(lctx, bgcolor, outlinecolor){
	// newOval/BG
	lctx.fillStyle = bgcolor;

	// newOval/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 2.0);
	lctx.lineTo(4.0, 2.0);
	lctx.lineTo(4.0, 1.0);
	lctx.lineTo(8.0, 1.0);
	lctx.lineTo(8.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newOval/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newOval/BG/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 7.0);
	lctx.lineTo(1.0, 7.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(2.0, 4.0);
	lctx.lineTo(2.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/BG/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 7.0);
	lctx.lineTo(10.0, 7.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(11.0, 4.0);
	lctx.lineTo(11.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/BG/Group
	lctx.save();
	lctx.beginPath();
	lctx.moveTo(10.0, 9.0);
	lctx.lineTo(2.0, 9.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(10.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline
	lctx.fillStyle = outlinecolor;

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 1.0);
	lctx.lineTo(4.0, 1.0);
	lctx.lineTo(4.0, 0.0);
	lctx.lineTo(8.0, 0.0);
	lctx.lineTo(8.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 2.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(4.0, 1.0);
	lctx.lineTo(4.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 11.0);
	lctx.lineTo(4.0, 11.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(8.0, 10.0);
	lctx.lineTo(8.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 7.0);
	lctx.lineTo(0.0, 7.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(1.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 4.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(1.0, 2.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(2.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 2.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(10.0, 1.0);
	lctx.lineTo(8.0, 1.0);
	lctx.lineTo(8.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 4.0);
	lctx.lineTo(11.0, 4.0);
	lctx.lineTo(11.0, 2.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(10.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 9.0);
	lctx.lineTo(2.0, 9.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 7.0);
	lctx.lineTo(1.0, 7.0);
	lctx.lineTo(1.0, 9.0);
	lctx.lineTo(2.0, 9.0);
	lctx.lineTo(2.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(8.0, 10.0);
	lctx.lineTo(8.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 7.0);
	lctx.lineTo(11.0, 7.0);
	lctx.lineTo(11.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 7.0);
	lctx.lineTo(11.0, 7.0);
	lctx.lineTo(11.0, 4.0);
	lctx.lineTo(12.0, 4.0);
	lctx.lineTo(12.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 15.0);
	lctx.lineTo(7.0, 15.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(12.0, 14.0);
	lctx.lineTo(12.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// newOval/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 17.0);
	lctx.lineTo(9.0, 17.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(10.0, 12.0);
	lctx.lineTo(10.0, 17.0);
	lctx.closePath();
	lctx.fill();
}

function drawNewRectButton(lctx, bgcolor, outlinecolor){
	// newRect/BG
	lctx.fillStyle = bgcolor;

	// newRect/BG/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 10.0);
	lctx.lineTo(1.0, 10.0);
	lctx.lineTo(1.0, 1.0);
	lctx.lineTo(11.0, 1.0);
	lctx.lineTo(11.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline
	lctx.fillStyle = outlinecolor;

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 1.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(12.0, 0.0);
	lctx.lineTo(12.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 11.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(12.0, 10.0);
	lctx.lineTo(12.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 15.0);
	lctx.lineTo(7.0, 15.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(12.0, 14.0);
	lctx.lineTo(12.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 10.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(1.0, 1.0);
	lctx.lineTo(1.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 1.0);
	lctx.lineTo(12.0, 1.0);
	lctx.lineTo(12.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// newRect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 17.0);
	lctx.lineTo(9.0, 17.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(10.0, 12.0);
	lctx.lineTo(10.0, 17.0);
	lctx.closePath();
	lctx.fill();
}


function drawShapeResizeButton(lctx, bgcolor, outlinecolor){
	
	// FILLS
	lctx.fillStyle = bgcolor;
	
	// shapeMove/Path
	lctx.save();
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(4.0, 0.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(5.0, 9.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 14.0);
	lctx.lineTo(10.0, 14.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(14.0, 10.0);
	lctx.lineTo(14.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 4.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(10.0, 0.0);
	lctx.lineTo(14.0, 0.0);
	lctx.lineTo(14.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 14.0);
	lctx.lineTo(0.0, 14.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 14.0);
	lctx.closePath();
	lctx.fill();

	
	// OUTLINES
	lctx.fillStyle = outlinecolor;
	
	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 11.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(11.0, 3.0);
	lctx.lineTo(12.0, 3.0);
	lctx.lineTo(12.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 12.0);
	lctx.lineTo(3.0, 12.0);
	lctx.lineTo(3.0, 11.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(11.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(11.0, 2.0);
	lctx.lineTo(11.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 11.0);
	lctx.lineTo(2.0, 11.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 11.0);
	lctx.closePath();
	lctx.fill();


	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 1.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(4.0, 0.0);
	lctx.lineTo(4.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(0.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 4.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(1.0, 0.0);
	lctx.lineTo(1.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 0.0);
	lctx.lineTo(4.0, 0.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 1.0);
	lctx.lineTo(10.0, 1.0);
	lctx.lineTo(10.0, 0.0);
	lctx.lineTo(14.0, 0.0);
	lctx.lineTo(14.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 4.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(10.0, 3.0);
	lctx.lineTo(14.0, 3.0);
	lctx.lineTo(14.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 4.0);
	lctx.lineTo(10.0, 4.0);
	lctx.lineTo(10.0, 0.0);
	lctx.lineTo(11.0, 0.0);
	lctx.lineTo(11.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 4.0);
	lctx.lineTo(13.0, 4.0);
	lctx.lineTo(13.0, 0.0);
	lctx.lineTo(14.0, 0.0);
	lctx.lineTo(14.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 11.0);
	lctx.lineTo(10.0, 11.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(14.0, 10.0);
	lctx.lineTo(14.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 14.0);
	lctx.lineTo(10.0, 14.0);
	lctx.lineTo(10.0, 13.0);
	lctx.lineTo(14.0, 13.0);
	lctx.lineTo(14.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 14.0);
	lctx.lineTo(10.0, 14.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 14.0);
	lctx.lineTo(13.0, 14.0);
	lctx.lineTo(13.0, 10.0);
	lctx.lineTo(14.0, 10.0);
	lctx.lineTo(14.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 11.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 14.0);
	lctx.lineTo(0.0, 14.0);
	lctx.lineTo(0.0, 13.0);
	lctx.lineTo(4.0, 13.0);
	lctx.lineTo(4.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 14.0);
	lctx.lineTo(0.0, 14.0);
	lctx.lineTo(0.0, 10.0);
	lctx.lineTo(1.0, 10.0);
	lctx.lineTo(1.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 14.0);
	lctx.lineTo(3.0, 14.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 6.0);
	lctx.lineTo(5.0, 6.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(9.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(5.0, 9.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(9.0, 8.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 9.0);
	lctx.lineTo(5.0, 9.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// shapeMove/Group/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 5.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();
}

function drawPathEditButton(lctx, bgcolor, outlinecolor){
	
	// shapeSelect/BG
	lctx.fillStyle = bgcolor;

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 18.0);
	lctx.lineTo(7.0, 18.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(8.0, 14.0);
	lctx.lineTo(8.0, 18.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 18.0);
	lctx.lineTo(8.0, 18.0);
	lctx.lineTo(8.0, 16.0);
	lctx.lineTo(9.0, 16.0);
	lctx.lineTo(9.0, 18.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 14.0);
	lctx.lineTo(5.0, 14.0);
	lctx.lineTo(5.0, 12.0);
	lctx.lineTo(6.0, 12.0);
	lctx.lineTo(6.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 4.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(1.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(7.0, 16.0);
	lctx.lineTo(6.0, 16.0);
	lctx.lineTo(6.0, 7.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(7.0, 16.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 12.0);
	lctx.lineTo(1.0, 12.0);
	lctx.lineTo(1.0, 6.0);
	lctx.lineTo(6.0, 6.0);
	lctx.lineTo(6.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 12.0);
	lctx.lineTo(8.0, 12.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(9.0, 9.0);
	lctx.lineTo(9.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 12.0);
	lctx.lineTo(7.0, 12.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 12.0);
	lctx.lineTo(10.0, 12.0);
	lctx.lineTo(10.0, 11.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(11.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 12.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(9.0, 10.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(10.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 16.0);
	lctx.lineTo(1.0, 16.0);
	lctx.lineTo(1.0, 15.0);
	lctx.lineTo(2.0, 15.0);
	lctx.lineTo(2.0, 16.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 3.0);
	lctx.lineTo(1.0, 3.0);
	lctx.lineTo(1.0, 2.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(2.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 15.0);
	lctx.lineTo(1.0, 15.0);
	lctx.lineTo(1.0, 14.0);
	lctx.lineTo(3.0, 14.0);
	lctx.lineTo(3.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 14.0);
	lctx.lineTo(1.0, 14.0);
	lctx.lineTo(1.0, 13.0);
	lctx.lineTo(4.0, 13.0);
	lctx.lineTo(4.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 5.0);
	lctx.lineTo(1.0, 5.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(4.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 13.0);
	lctx.lineTo(1.0, 13.0);
	lctx.lineTo(1.0, 12.0);
	lctx.lineTo(5.0, 12.0);
	lctx.lineTo(5.0, 13.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/BG/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 6.0);
	lctx.lineTo(1.0, 6.0);
	lctx.lineTo(1.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline
	lctx.fillStyle = outlinecolor;

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(1.0, 17.0);
	lctx.lineTo(0.0, 17.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(1.0, 0.0);
	lctx.lineTo(1.0, 17.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(1.0, 2.0);
	lctx.lineTo(1.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 6.0);
	lctx.lineTo(5.0, 6.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(5.0, 4.0);
	lctx.lineTo(5.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 8.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(8.0, 7.0);
	lctx.lineTo(8.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(7.0, 7.0);
	lctx.lineTo(6.0, 7.0);
	lctx.lineTo(6.0, 6.0);
	lctx.lineTo(7.0, 6.0);
	lctx.lineTo(7.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 13.0);
	lctx.lineTo(7.0, 13.0);
	lctx.lineTo(7.0, 12.0);
	lctx.lineTo(12.0, 12.0);
	lctx.lineTo(12.0, 13.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(9.0, 8.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 10.0);
	lctx.lineTo(9.0, 10.0);
	lctx.lineTo(9.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(10.0, 11.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 12.0);
	lctx.lineTo(11.0, 12.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(12.0, 11.0);
	lctx.lineTo(12.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 19.0);
	lctx.lineTo(7.0, 19.0);
	lctx.lineTo(7.0, 18.0);
	lctx.lineTo(9.0, 18.0);
	lctx.lineTo(9.0, 19.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 17.0);
	lctx.lineTo(1.0, 17.0);
	lctx.lineTo(1.0, 16.0);
	lctx.lineTo(2.0, 16.0);
	lctx.lineTo(2.0, 17.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 16.0);
	lctx.lineTo(2.0, 16.0);
	lctx.lineTo(2.0, 15.0);
	lctx.lineTo(3.0, 15.0);
	lctx.lineTo(3.0, 16.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 15.0);
	lctx.lineTo(3.0, 15.0);
	lctx.lineTo(3.0, 14.0);
	lctx.lineTo(4.0, 14.0);
	lctx.lineTo(4.0, 15.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 14.0);
	lctx.lineTo(4.0, 14.0);
	lctx.lineTo(4.0, 13.0);
	lctx.lineTo(5.0, 13.0);
	lctx.lineTo(5.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 14.0);
	lctx.lineTo(6.0, 14.0);
	lctx.lineTo(6.0, 16.0);
	lctx.lineTo(5.0, 16.0);
	lctx.lineTo(5.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 16.0);
	lctx.lineTo(7.0, 16.0);
	lctx.lineTo(7.0, 18.0);
	lctx.lineTo(6.0, 18.0);
	lctx.lineTo(6.0, 16.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(7.0, 12.0);
	lctx.lineTo(8.0, 12.0);
	lctx.lineTo(8.0, 14.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(7.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 14.0);
	lctx.lineTo(9.0, 14.0);
	lctx.lineTo(9.0, 16.0);
	lctx.lineTo(8.0, 16.0);
	lctx.lineTo(8.0, 14.0);
	lctx.closePath();
	lctx.fill();

	// shapeSelect/Outline/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 16.0);
	lctx.lineTo(10.0, 16.0);
	lctx.lineTo(10.0, 18.0);
	lctx.lineTo(9.0, 18.0);
	lctx.lineTo(9.0, 16.0);
	lctx.closePath();
	lctx.fill();
}


function drawPanButton(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;
	
	lctx.beginPath();
	lctx.moveTo(9.0, 7.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(7.0, 2.0);
	lctx.lineTo(9.0, 2.0);
	lctx.lineTo(9.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 3.0);
	lctx.lineTo(5.0, 3.0);
	lctx.lineTo(5.0, 2.0);
	lctx.lineTo(11.0, 2.0);
	lctx.lineTo(11.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 2.0);
	lctx.lineTo(6.0, 2.0);
	lctx.lineTo(6.0, 1.0);
	lctx.lineTo(10.0, 1.0);
	lctx.lineTo(10.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 1.0);
	lctx.lineTo(7.0, 1.0);
	lctx.lineTo(7.0, 0.0);
	lctx.lineTo(9.0, 0.0);
	lctx.lineTo(9.0, 1.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 7.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(7.0, 12.0);
	lctx.lineTo(9.0, 12.0);
	lctx.lineTo(9.0, 7.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(5.0, 11.0);
	lctx.lineTo(5.0, 12.0);
	lctx.lineTo(11.0, 12.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 12.0);
	lctx.lineTo(6.0, 12.0);
	lctx.lineTo(6.0, 13.0);
	lctx.lineTo(10.0, 13.0);
	lctx.lineTo(10.0, 12.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 13.0);
	lctx.lineTo(7.0, 13.0);
	lctx.lineTo(7.0, 14.0);
	lctx.lineTo(9.0, 14.0);
	lctx.lineTo(9.0, 13.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 6.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(13.0, 8.0);
	lctx.lineTo(13.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(12.0, 4.0);
	lctx.lineTo(12.0, 10.0);
	lctx.lineTo(13.0, 10.0);
	lctx.lineTo(13.0, 4.0);
	lctx.lineTo(12.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(13.0, 5.0);
	lctx.lineTo(13.0, 9.0);
	lctx.lineTo(14.0, 9.0);
	lctx.lineTo(14.0, 5.0);
	lctx.lineTo(13.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(14.0, 6.0);
	lctx.lineTo(14.0, 8.0);
	lctx.lineTo(15.0, 8.0);
	lctx.lineTo(15.0, 6.0);
	lctx.lineTo(14.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 6.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(3.0, 8.0);
	lctx.lineTo(3.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 5.0);
	lctx.lineTo(3.0, 9.0);
	lctx.lineTo(2.0, 9.0);
	lctx.lineTo(2.0, 5.0);
	lctx.lineTo(3.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// pan/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 6.0);
	lctx.lineTo(2.0, 8.0);
	lctx.lineTo(1.0, 8.0);
	lctx.lineTo(1.0, 6.0);
	lctx.lineTo(2.0, 6.0);
	lctx.closePath();
	lctx.fill();

}

function drawZoomInButton(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;
	
	lctx.beginPath();
	lctx.moveTo(9.0, 3.0);
	lctx.lineTo(7.0, 3.0);
	lctx.lineTo(7.0, 13.0);
	lctx.lineTo(9.0, 13.0);
	lctx.lineTo(9.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(13.0, 7.0);
	lctx.lineTo(13.0, 9.0);
	lctx.lineTo(3.0, 9.0);
	lctx.lineTo(3.0, 7.0);
	lctx.lineTo(13.0, 7.0);
	lctx.closePath();
	lctx.fill();
}

function drawZoomOutButton(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;

	lctx.beginPath();
	lctx.moveTo(13.0, 7.0);
	lctx.lineTo(13.0, 9.0);
	lctx.lineTo(3.0, 9.0);
	lctx.lineTo(3.0, 7.0);
	lctx.lineTo(13.0, 7.0);
	lctx.closePath();
	lctx.fill();
}

function drawZoom1to1Button(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;

	lctx.beginPath();
	lctx.moveTo(5.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 13.0);
	lctx.lineTo(5.0, 13.0);
	lctx.lineTo(5.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(14.0, 3.0);
	lctx.lineTo(12.0, 3.0);
	lctx.lineTo(12.0, 13.0);
	lctx.lineTo(14.0, 13.0);
	lctx.lineTo(14.0, 3.0);
	lctx.closePath();
	lctx.fill();
	
	lctx.beginPath();
	lctx.moveTo(12.0, 3.0);
	lctx.lineTo(11.0, 3.0);
	lctx.lineTo(11.0, 5.0);
	lctx.lineTo(12.0, 5.0);
	lctx.lineTo(12.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 5.0);
	lctx.lineTo(3.0, 5.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(7.0, 9.0);
	lctx.lineTo(7.0, 11.0);
	lctx.lineTo(9.0, 11.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(9.0, 5.0);
	lctx.lineTo(7.0, 5.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(9.0, 7.0);
	lctx.lineTo(9.0, 5.0);
	lctx.closePath();
	lctx.fill();

}

function drawZoomEmButton(lctx, bgcolor, outlinecolor){

	lctx.fillStyle = bgcolor;
	
	lctx.save();
	lctx.beginPath();
	lctx.moveTo(1.0, 0.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(1.0, 11.0);
	lctx.lineTo(1.0, 0.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(4.0, 2.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(4.0, 10.0);
	lctx.lineTo(4.0, 2.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(12.0, 2.0);
	lctx.lineTo(10.0, 2.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(12.0, 10.0);
	lctx.lineTo(12.0, 2.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(11.0, 3.0);
	lctx.lineTo(9.0, 3.0);
	lctx.lineTo(9.0, 5.0);
	lctx.lineTo(11.0, 5.0);
	lctx.lineTo(11.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(10.0, 4.0);
	lctx.lineTo(8.0, 4.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(10.0, 6.0);
	lctx.lineTo(10.0, 4.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(8.0, 6.0);
	lctx.lineTo(6.0, 6.0);
	lctx.lineTo(6.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 6.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(6.0, 4.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(4.0, 6.0);
	lctx.lineTo(6.0, 6.0);
	lctx.lineTo(6.0, 4.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(9.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 7.0);
	lctx.lineTo(9.0, 7.0);
	lctx.lineTo(9.0, 5.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(5.0, 3.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(3.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 3.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(14.0, 0.0);
	lctx.lineTo(13.0, 0.0);
	lctx.lineTo(13.0, 11.0);
	lctx.lineTo(14.0, 11.0);
	lctx.lineTo(14.0, 0.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(14.0, 11.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(0.0, 12.0);
	lctx.lineTo(14.0, 12.0);
	lctx.lineTo(14.0, 11.0);
	lctx.closePath();
	lctx.fill();

	lctx.beginPath();
	lctx.moveTo(14.0, 0.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(0.0, 1.0);
	lctx.lineTo(14.0, 1.0);
	lctx.lineTo(14.0, 0.0);
	lctx.closePath();
	lctx.fill();
}



//	----------------------
//	POINT TYPES
//	----------------------

function drawPointCornerButton(lctx, c){
	lctx.fillStyle = c;

	// buttons/PointCorner/Path

	lctx.beginPath();
	lctx.moveTo(6.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 5.0);
	lctx.lineTo(7.0, 5.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(8.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 7.0);
	lctx.lineTo(5.0, 7.0);
	lctx.lineTo(5.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(5.0, 4.0);
	lctx.lineTo(5.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 9.0);
	lctx.lineTo(4.0, 9.0);
	lctx.lineTo(4.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 10.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(3.0, 9.0);
	lctx.lineTo(4.0, 9.0);
	lctx.lineTo(4.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 11.0);
	lctx.lineTo(2.0, 11.0);
	lctx.lineTo(2.0, 10.0);
	lctx.lineTo(3.0, 10.0);
	lctx.lineTo(3.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(0.0, 2.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointCorner/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 13.0);
	lctx.lineTo(0.0, 13.0);
	lctx.lineTo(0.0, 11.0);
	lctx.lineTo(2.0, 11.0);
	lctx.lineTo(2.0, 13.0);
	lctx.closePath();
	lctx.fill();


}

function drawPointFlatButton(lctx, c){
	lctx.fillStyle = c;

	// buttons/PointFlat/Path

	lctx.beginPath();
	lctx.moveTo(6.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 5.0);
	lctx.lineTo(7.0, 5.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(8.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 8.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(7.0, 7.0);
	lctx.lineTo(6.0, 7.0);
	lctx.lineTo(6.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(5.0, 4.0);
	lctx.lineTo(5.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(9.0, 8.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(0.0, 2.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointFlat/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(9.0, 11.0);
	lctx.lineTo(9.0, 9.0);
	lctx.lineTo(11.0, 9.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

}

function drawPointSymmetricButton(lctx, c){
	lctx.fillStyle = c;

	// buttons/PointSymmetric/Path

	lctx.beginPath();
	lctx.moveTo(5.0, 5.0);
	lctx.lineTo(4.0, 5.0);
	lctx.lineTo(4.0, 4.0);
	lctx.lineTo(5.0, 4.0);
	lctx.lineTo(5.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(4.0, 4.0);
	lctx.lineTo(3.0, 4.0);
	lctx.lineTo(3.0, 3.0);
	lctx.lineTo(4.0, 3.0);
	lctx.lineTo(4.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(3.0, 3.0);
	lctx.lineTo(2.0, 3.0);
	lctx.lineTo(2.0, 2.0);
	lctx.lineTo(3.0, 2.0);
	lctx.lineTo(3.0, 3.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 2.0);
	lctx.lineTo(0.0, 2.0);
	lctx.lineTo(0.0, 0.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(2.0, 2.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(11.0, 11.0);
	lctx.lineTo(10.0, 11.0);
	lctx.lineTo(10.0, 10.0);
	lctx.lineTo(11.0, 10.0);
	lctx.lineTo(11.0, 11.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(10.0, 10.0);
	lctx.lineTo(9.0, 10.0);
	lctx.lineTo(9.0, 9.0);
	lctx.lineTo(10.0, 9.0);
	lctx.lineTo(10.0, 10.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(9.0, 9.0);
	lctx.lineTo(8.0, 9.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(9.0, 8.0);
	lctx.lineTo(9.0, 9.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(13.0, 13.0);
	lctx.lineTo(11.0, 13.0);
	lctx.lineTo(11.0, 11.0);
	lctx.lineTo(13.0, 11.0);
	lctx.lineTo(13.0, 13.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(6.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(6.0, 5.0);
	lctx.lineTo(6.0, 8.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 5.0);
	lctx.lineTo(7.0, 5.0);
	lctx.lineTo(7.0, 8.0);
	lctx.lineTo(8.0, 8.0);
	lctx.lineTo(8.0, 5.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 6.0);
	lctx.lineTo(8.0, 6.0);
	lctx.lineTo(8.0, 5.0);
	lctx.lineTo(5.0, 5.0);
	lctx.lineTo(5.0, 6.0);
	lctx.closePath();
	lctx.fill();

	// buttons/PointSymmetric/Path
	lctx.beginPath();
	lctx.moveTo(8.0, 8.0);
	lctx.lineTo(5.0, 8.0);
	lctx.lineTo(5.0, 7.0);
	lctx.lineTo(8.0, 7.0);
	lctx.lineTo(8.0, 8.0);
	lctx.closePath();
	lctx.fill();

}



//	-----------------------
//	LOCK, SPINNER, CHECKBOX
//	-----------------------

function drawLockButton(obj, c) {
	//debug("DRAWLOCKBUTTON obj/c: " + obj + "," + c);
		
	var lctx = obj.getContext('2d');
	lctx.fillStyle = c;
	
	// lock/Path
	lctx.beginPath();
	lctx.moveTo(7.0, 4.0);
	lctx.lineTo(0.0, 4.0);
	lctx.lineTo(0.0, 9.0);
	lctx.lineTo(7.0, 9.0);
	lctx.lineTo(7.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// lock/Path
	lctx.beginPath();
	lctx.moveTo(2.0, 4.0);
	lctx.lineTo(1.0, 4.0);
	lctx.lineTo(1.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// lock/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 4.0);
	lctx.lineTo(6.0, 4.0);
	lctx.lineTo(6.0, 1.0);
	lctx.lineTo(5.0, 1.0);
	lctx.lineTo(5.0, 4.0);
	lctx.closePath();
	lctx.fill();

	// lock/Path
	lctx.beginPath();
	lctx.moveTo(5.0, 1.0);
	lctx.lineTo(2.0, 1.0);
	lctx.lineTo(2.0, 0.0);
	lctx.lineTo(5.0, 0.0);
	lctx.lineTo(5.0, 1.0);
	lctx.closePath();
	lctx.fill();
	
	//debug("END OF DRAWLOCKBUTTON");
}

function drawCheckbox(obj, ischecked) {
	var lctx = obj.getContext('2d');
	
	//Box
	lctx.fillStyle = color_lighttext;
	lctx.beginPath();
	lctx.moveTo(12.0, 15.0);
	lctx.lineTo(0.0, 15.0);
	lctx.lineTo(0.0, 3.0);
	lctx.lineTo(12.0, 3.0);
	lctx.lineTo(12.0, 15.0);
	lctx.closePath();
	lctx.fill();
	
	if(ischecked){
		//Check
		lctx.fillStyle = color_accent;
		lctx.beginPath();
		lctx.moveTo(0.0, 9.0);
		lctx.lineTo(5.5, 15.0);
		lctx.lineTo(15.0, 3.5);
		lctx.lineTo(13.0, 0.0);
		lctx.lineTo(5.5, 11.0);
		lctx.lineTo(2.0, 6.5);
		lctx.lineTo(0.0, 9.0);
		lctx.closePath();
		lctx.fill();
	}
}


