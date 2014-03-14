
//-------------------
// Logos
//-------------------
	function drawLogo() {
		logoctx = document.getElementById("logocanvas").getContext("2d");
		logoctx.clearRect(0,0,3000,3000);

		// Main Logo
		logoctx.strokeStyle = _UI.colors.accent;

		logoctx.beginPath();
		logoctx.moveTo(37, 41);
		logoctx.lineTo(37, 2);
		logoctx.lineTo(40.8, 2);
		logoctx.lineWidth = 4;
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(2, 30);
		logoctx.bezierCurveTo(2, 43.3, 31, 43.3, 31, 30);
		logoctx.bezierCurveTo(31, 11, 2, 11, 2, 30);
		logoctx.closePath();
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(31, 30);
		logoctx.lineTo(31, 46);
		logoctx.bezierCurveTo(31, 59.3, 2, 59.3, 2, 46);
		logoctx.lineTo(6, 46);
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(72, 30);
		logoctx.bezierCurveTo(72, 43.3, 43, 43.3, 43, 30);
		logoctx.lineTo(43, 16);
		logoctx.lineTo(47, 16);
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(47, 46);
		logoctx.lineTo(43, 46);
		logoctx.bezierCurveTo(43, 59.3, 72, 59.3, 72, 46);
		logoctx.lineTo(72, 30);
		logoctx.lineTo(72, 14);
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(107, 30);
		logoctx.bezierCurveTo(107, 43.3, 78, 43.3, 78, 30);
		logoctx.bezierCurveTo(78, 11, 107, 11, 107, 30);
		logoctx.closePath();
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(78, 30);
		logoctx.lineTo(78, 56);
		logoctx.lineTo(81.9, 56);
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(142, 42);
		logoctx.lineTo(142, 30);
		logoctx.bezierCurveTo(142, 11, 113, 11, 113, 30);
		logoctx.lineTo(113, 40);
		logoctx.lineTo(117, 40);
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(113, 28);
		logoctx.lineTo(113, 2);
		logoctx.lineTo(116.9, 2);
		logoctx.stroke();

		logoctx.beginPath();
		logoctx.moveTo(177, 30);
		logoctx.bezierCurveTo(177, 11, 148, 11, 148, 30);
		logoctx.lineTo(148, 40);
		logoctx.lineTo(152, 40);
		logoctx.stroke();

		// Beta Logo
		logoctx.fillStyle = _UI.colors.accent_light;

		logoctx.beginPath();
		logoctx.moveTo(148, 49);
		logoctx.lineTo(149, 49);
		logoctx.lineTo(149, 48);
		logoctx.lineTo(148, 48);
		logoctx.lineTo(148, 49);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(148, 46);
		logoctx.lineTo(148, 47);
		logoctx.lineTo(149, 47);
		logoctx.lineTo(149, 46);
		logoctx.lineTo(148, 46);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(161, 47);
		logoctx.lineTo(161, 46);
		logoctx.lineTo(160, 46);
		logoctx.lineTo(160, 47);
		logoctx.lineTo(161, 47);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(146, 44);
		logoctx.lineTo(146, 51);
		logoctx.lineTo(163, 51);
		logoctx.lineTo(163, 44);
		logoctx.lineTo(146, 44);
		logoctx.closePath();

		logoctx.moveTo(150, 47);
		logoctx.lineTo(149, 47);
		logoctx.lineTo(149, 48);
		logoctx.lineTo(150, 48);
		logoctx.lineTo(150, 49);
		logoctx.lineTo(149, 49);
		logoctx.lineTo(149, 50);
		logoctx.lineTo(148, 50);
		logoctx.lineTo(147, 50);
		logoctx.lineTo(147, 45);
		logoctx.lineTo(148, 45);
		logoctx.lineTo(149, 45);
		logoctx.lineTo(149, 46);
		logoctx.lineTo(150, 46);
		logoctx.lineTo(150, 47);
		logoctx.closePath();

		logoctx.moveTo(154, 46);
		logoctx.lineTo(152, 46);
		logoctx.lineTo(152, 47);
		logoctx.lineTo(153, 47);
		logoctx.lineTo(153, 48);
		logoctx.lineTo(152, 48);
		logoctx.lineTo(152, 49);
		logoctx.lineTo(154, 49);
		logoctx.lineTo(154, 50);
		logoctx.lineTo(152, 50);
		logoctx.lineTo(151, 50);
		logoctx.lineTo(151, 45);
		logoctx.lineTo(152, 45);
		logoctx.lineTo(154, 45);
		logoctx.lineTo(154, 46);
		logoctx.closePath();

		logoctx.moveTo(158, 46);
		logoctx.lineTo(157, 46);
		logoctx.lineTo(157, 50);
		logoctx.lineTo(156, 50);
		logoctx.lineTo(156, 46);
		logoctx.lineTo(155, 46);
		logoctx.lineTo(155, 45);
		logoctx.lineTo(158, 45);
		logoctx.lineTo(158, 46);
		logoctx.closePath();

		logoctx.moveTo(162, 50);
		logoctx.lineTo(161, 50);
		logoctx.lineTo(161, 48);
		logoctx.lineTo(160, 48);
		logoctx.lineTo(160, 50);
		logoctx.lineTo(159, 50);
		logoctx.lineTo(159, 46);
		logoctx.lineTo(160, 46);
		logoctx.lineTo(160, 45);
		logoctx.lineTo(161, 45);
		logoctx.lineTo(161, 46);
		logoctx.lineTo(162, 46);
		logoctx.lineTo(162, 50);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(164, 45);
		logoctx.lineTo(164, 46);
		logoctx.lineTo(165, 46);
		logoctx.lineTo(165, 45);
		logoctx.lineTo(164, 45);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(168, 45);
		logoctx.lineTo(168, 46);
		logoctx.lineTo(169, 46);
		logoctx.lineTo(169, 45);
		logoctx.lineTo(168, 45);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(167, 46);
		logoctx.lineTo(167, 47);
		logoctx.lineTo(168, 47);
		logoctx.lineTo(168, 46);
		logoctx.lineTo(167, 46);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(166, 47);
		logoctx.lineTo(166, 48);
		logoctx.lineTo(168, 48);
		logoctx.lineTo(168, 47);
		logoctx.lineTo(166, 47);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(164, 49);
		logoctx.lineTo(164, 50);
		logoctx.lineTo(165, 50);
		logoctx.lineTo(165, 49);
		logoctx.lineTo(164, 49);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(165, 50);
		logoctx.lineTo(165, 51);
		logoctx.lineTo(168, 51);
		logoctx.lineTo(168, 50);
		logoctx.lineTo(165, 50);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(168, 47);
		logoctx.lineTo(168, 50);
		logoctx.lineTo(169, 50);
		logoctx.lineTo(169, 47);
		logoctx.lineTo(168, 47);
		logoctx.closePath();
		logoctx.fill();

		logoctx.beginPath();
		logoctx.moveTo(165, 44);
		logoctx.lineTo(165, 45);
		logoctx.lineTo(168, 45);
		logoctx.lineTo(168, 44);
		logoctx.lineTo(165, 44);
		logoctx.closePath();
		logoctx.fill();


	}

	function drawSplashScreen(){
		ssctx = document.getElementById("splashscreencanvas").getContext("2d");
		ssctx.clearRect(0,0,3000,3000);

		// splashScreen/BG
		ssctx.fillStyle = _UI.colors.accent;
		ssctx.save();
		ssctx.beginPath();
		ssctx.moveTo(800.0, 494.0);
		ssctx.lineTo(0.0, 494.0);
		ssctx.lineTo(0.0, 0.0);
		ssctx.lineTo(800.0, 0.0);
		ssctx.lineTo(800.0, 494.0);
		ssctx.closePath();
		ssctx.fill();

		// splashScreen/LOGO
		ssctx.strokeStyle = _UI.colors.offwhite;

		// splashScreen/LOGO/Path
		ssctx.save();
		ssctx.beginPath();
		ssctx.moveTo(260.2, 219.6);
		ssctx.lineTo(260.2, 121.3);
		ssctx.lineTo(270.6, 121.3);
		ssctx.lineWidth = 10.5;
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(167.0, 188.6);
		ssctx.bezierCurveTo(167.0, 224.8, 244.7, 224.8, 244.7, 188.6);
		ssctx.bezierCurveTo(244.7, 136.8, 167.0, 136.8, 167.0, 188.6);
		ssctx.closePath();
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(244.7, 188.6);
		ssctx.lineTo(244.7, 224.8);
		ssctx.bezierCurveTo(244.7, 261.1, 167.0, 261.1, 167.0, 224.8);
		ssctx.lineTo(177.4, 224.8);
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(368.9, 188.6);
		ssctx.lineTo(368.9, 250.7);
		ssctx.lineTo(379.3, 250.7);
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(446.6, 188.6);
		ssctx.bezierCurveTo(446.6, 224.8, 368.9, 224.8, 368.9, 188.6);
		ssctx.bezierCurveTo(368.9, 136.8, 446.6, 136.8, 446.6, 188.6);
		ssctx.closePath();
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(565.7, 214.5);
		ssctx.lineTo(555.3, 214.5);
		ssctx.lineTo(555.3, 188.6);
		ssctx.bezierCurveTo(555.3, 136.8, 633.0, 136.8, 633.0, 188.6);
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(353.4, 147.2);
		ssctx.lineTo(353.4, 224.8);
		ssctx.bezierCurveTo(353.4, 261.1, 275.7, 261.1, 275.7, 224.8);
		ssctx.lineTo(286.1, 224.8);
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(275.7, 188.6);
		ssctx.bezierCurveTo(275.7, 224.8, 353.3, 224.8, 353.3, 188.6);
		ssctx.lineWidth = 10.2;
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(275.7, 189.8);
		ssctx.lineTo(275.7, 152.3);
		ssctx.lineTo(286.1, 152.3);
		ssctx.lineWidth = 10.5;
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(472.5, 121.3);
		ssctx.lineTo(462.1, 121.3);
		ssctx.lineTo(462.1, 214.5);
		ssctx.lineTo(472.5, 214.5);
		ssctx.stroke();

		// splashScreen/LOGO/Path
		ssctx.beginPath();
		ssctx.moveTo(462.1, 188.6);
		ssctx.bezierCurveTo(462.1, 136.8, 539.8, 136.8, 539.8, 188.6);
		ssctx.lineTo(539.8, 219.6);
		ssctx.stroke();

		// splashScreen/STUDIO

		ssctx.restore();

		// splashScreen/STUDIO/Compound Path
		ssctx.save();
		ssctx.fillStyle = _UI.colors.accent_light;
		ssctx.beginPath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(554.2, 240.1);
		ssctx.bezierCurveTo(553.2, 240.1, 552.4, 240.0, 551.6, 239.8);
		ssctx.bezierCurveTo(550.9, 239.6, 550.3, 239.3, 549.6, 239.0);
		ssctx.lineTo(549.6, 236.6);
		ssctx.lineTo(549.8, 236.6);
		ssctx.bezierCurveTo(550.4, 237.2, 551.1, 237.7, 551.9, 238.0);
		ssctx.bezierCurveTo(552.6, 238.3, 553.4, 238.5, 554.1, 238.5);
		ssctx.bezierCurveTo(555.2, 238.5, 555.9, 238.2, 556.5, 237.8);
		ssctx.bezierCurveTo(557.0, 237.4, 557.3, 236.8, 557.3, 236.1);
		ssctx.bezierCurveTo(557.3, 235.5, 557.1, 235.1, 556.8, 234.7);
		ssctx.bezierCurveTo(556.6, 234.4, 556.1, 234.1, 555.5, 233.9);
		ssctx.bezierCurveTo(555.1, 233.8, 554.7, 233.7, 554.3, 233.6);
		ssctx.bezierCurveTo(554.0, 233.6, 553.5, 233.4, 553.0, 233.3);
		ssctx.bezierCurveTo(552.5, 233.2, 552.1, 233.0, 551.7, 232.8);
		ssctx.bezierCurveTo(551.3, 232.6, 550.9, 232.4, 550.6, 232.1);
		ssctx.bezierCurveTo(550.4, 231.7, 550.1, 231.4, 550.0, 231.0);
		ssctx.bezierCurveTo(549.8, 230.5, 549.7, 230.1, 549.7, 229.5);
		ssctx.bezierCurveTo(549.7, 228.4, 550.2, 227.4, 551.1, 226.6);
		ssctx.bezierCurveTo(551.9, 225.9, 553.1, 225.5, 554.5, 225.5);
		ssctx.bezierCurveTo(555.3, 225.5, 556.0, 225.6, 556.7, 225.7);
		ssctx.bezierCurveTo(557.4, 225.9, 558.1, 226.1, 558.7, 226.4);
		ssctx.lineTo(558.7, 228.6);
		ssctx.lineTo(558.5, 228.6);
		ssctx.bezierCurveTo(558.1, 228.2, 557.5, 227.9, 556.8, 227.6);
		ssctx.bezierCurveTo(556.1, 227.3, 555.4, 227.1, 554.6, 227.1);
		ssctx.bezierCurveTo(553.7, 227.1, 553.0, 227.3, 552.5, 227.7);
		ssctx.bezierCurveTo(551.9, 228.1, 551.7, 228.6, 551.7, 229.3);
		ssctx.bezierCurveTo(551.7, 229.9, 551.8, 230.4, 552.1, 230.7);
		ssctx.bezierCurveTo(552.5, 231.1, 552.9, 231.4, 553.5, 231.5);
		ssctx.bezierCurveTo(553.9, 231.6, 554.4, 231.7, 555.0, 231.9);
		ssctx.bezierCurveTo(555.6, 232.0, 556.0, 232.1, 556.4, 232.3);
		ssctx.bezierCurveTo(557.4, 232.6, 558.1, 233.0, 558.5, 233.6);
		ssctx.bezierCurveTo(559.0, 234.2, 559.2, 234.9, 559.2, 235.8);
		ssctx.bezierCurveTo(559.2, 236.4, 559.1, 236.9, 558.9, 237.4);
		ssctx.bezierCurveTo(558.6, 238.0, 558.3, 238.4, 557.9, 238.8);
		ssctx.bezierCurveTo(557.5, 239.2, 557.0, 239.5, 556.4, 239.7);
		ssctx.bezierCurveTo(555.8, 240.0, 555.1, 240.1, 554.2, 240.1);
		ssctx.closePath();
		ssctx.fill();

		// splashScreen/STUDIO/Compound Path
		ssctx.beginPath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(564.4, 239.8);
		ssctx.lineTo(564.4, 227.4);
		ssctx.lineTo(559.7, 227.4);
		ssctx.lineTo(559.7, 225.7);
		ssctx.lineTo(571.0, 225.7);
		ssctx.lineTo(571.0, 227.4);
		ssctx.lineTo(566.3, 227.4);
		ssctx.lineTo(566.3, 239.8);
		ssctx.lineTo(564.4, 239.8);
		ssctx.closePath();
		ssctx.fill();

		// splashScreen/STUDIO/Compound Path
		ssctx.beginPath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(577.4, 240.1);
		ssctx.bezierCurveTo(576.5, 240.1, 575.8, 240.0, 575.2, 239.8);
		ssctx.bezierCurveTo(574.6, 239.6, 574.0, 239.3, 573.6, 238.8);
		ssctx.bezierCurveTo(573.1, 238.3, 572.8, 237.7, 572.6, 237.1);
		ssctx.bezierCurveTo(572.4, 236.4, 572.3, 235.5, 572.3, 234.5);
		ssctx.lineTo(572.3, 225.7);
		ssctx.lineTo(574.1, 225.7);
		ssctx.lineTo(574.1, 234.5);
		ssctx.bezierCurveTo(574.1, 235.2, 574.2, 235.7, 574.3, 236.2);
		ssctx.bezierCurveTo(574.3, 236.6, 574.5, 237.0, 574.7, 237.4);
		ssctx.bezierCurveTo(575.0, 237.7, 575.3, 238.0, 575.8, 238.2);
		ssctx.bezierCurveTo(576.2, 238.4, 576.7, 238.5, 577.4, 238.5);
		ssctx.bezierCurveTo(577.9, 238.5, 578.5, 238.4, 578.9, 238.2);
		ssctx.bezierCurveTo(579.4, 238.0, 579.7, 237.7, 580.0, 237.4);
		ssctx.bezierCurveTo(580.2, 237.0, 580.4, 236.6, 580.5, 236.2);
		ssctx.bezierCurveTo(580.5, 235.7, 580.6, 235.2, 580.6, 234.6);
		ssctx.lineTo(580.6, 225.7);
		ssctx.lineTo(582.5, 225.7);
		ssctx.lineTo(582.5, 234.5);
		ssctx.bezierCurveTo(582.5, 235.5, 582.4, 236.3, 582.2, 237.0);
		ssctx.bezierCurveTo(582.0, 237.7, 581.6, 238.3, 581.1, 238.8);
		ssctx.bezierCurveTo(580.7, 239.3, 580.1, 239.6, 579.5, 239.8);
		ssctx.bezierCurveTo(578.9, 240.0, 578.2, 240.1, 577.4, 240.1);
		ssctx.closePath();
		ssctx.fill();

		// splashScreen/STUDIO/Compound Path
		ssctx.beginPath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(596.3, 232.8);
		ssctx.bezierCurveTo(596.3, 234.1, 596.0, 235.2, 595.5, 236.3);
		ssctx.bezierCurveTo(595.0, 237.3, 594.3, 238.1, 593.4, 238.7);
		ssctx.bezierCurveTo(592.7, 239.1, 591.9, 239.4, 591.2, 239.6);
		ssctx.bezierCurveTo(590.5, 239.7, 589.5, 239.8, 588.4, 239.8);
		ssctx.lineTo(585.1, 239.8);
		ssctx.lineTo(585.1, 225.7);
		ssctx.lineTo(588.4, 225.7);
		ssctx.bezierCurveTo(589.7, 225.7, 590.7, 225.8, 591.5, 226.0);
		ssctx.bezierCurveTo(592.2, 226.2, 592.9, 226.5, 593.4, 226.9);
		ssctx.bezierCurveTo(594.3, 227.5, 595.0, 228.2, 595.5, 229.2);
		ssctx.bezierCurveTo(596.0, 230.2, 596.3, 231.4, 596.3, 232.8);
		ssctx.closePath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(594.3, 232.8);
		ssctx.bezierCurveTo(594.3, 231.7, 594.1, 230.8, 593.8, 230.0);
		ssctx.bezierCurveTo(593.4, 229.2, 592.9, 228.6, 592.2, 228.2);
		ssctx.bezierCurveTo(591.7, 227.9, 591.1, 227.7, 590.6, 227.5);
		ssctx.bezierCurveTo(590.0, 227.4, 589.3, 227.3, 588.4, 227.3);
		ssctx.lineTo(587.0, 227.3);
		ssctx.lineTo(587.0, 238.2);
		ssctx.lineTo(588.4, 238.2);
		ssctx.bezierCurveTo(589.3, 238.2, 590.0, 238.1, 590.6, 238.0);
		ssctx.bezierCurveTo(591.3, 237.9, 591.8, 237.6, 592.3, 237.3);
		ssctx.bezierCurveTo(593.0, 236.8, 593.5, 236.2, 593.8, 235.5);
		ssctx.bezierCurveTo(594.1, 234.8, 594.3, 233.9, 594.3, 232.8);
		ssctx.closePath();
		ssctx.fill();

		// splashScreen/STUDIO/Compound Path
		ssctx.beginPath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(603.2, 239.8);
		ssctx.lineTo(597.7, 239.8);
		ssctx.lineTo(597.7, 238.4);
		ssctx.lineTo(599.5, 238.4);
		ssctx.lineTo(599.5, 227.2);
		ssctx.lineTo(597.7, 227.2);
		ssctx.lineTo(597.7, 225.7);
		ssctx.lineTo(603.2, 225.7);
		ssctx.lineTo(603.2, 227.2);
		ssctx.lineTo(601.4, 227.2);
		ssctx.lineTo(601.4, 238.4);
		ssctx.lineTo(603.2, 238.4);
		ssctx.lineTo(603.2, 239.8);
		ssctx.closePath();
		ssctx.fill();

		// splashScreen/STUDIO/Compound Path
		ssctx.beginPath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(615.5, 227.4);
		ssctx.bezierCurveTo(616.0, 228.0, 616.4, 228.7, 616.7, 229.7);
		ssctx.bezierCurveTo(617.0, 230.6, 617.2, 231.6, 617.2, 232.8);
		ssctx.bezierCurveTo(617.2, 233.9, 617.0, 235.0, 616.7, 235.9);
		ssctx.bezierCurveTo(616.4, 236.8, 616.0, 237.6, 615.5, 238.2);
		ssctx.bezierCurveTo(614.9, 238.9, 614.2, 239.3, 613.5, 239.6);
		ssctx.bezierCurveTo(612.7, 240.0, 611.9, 240.1, 610.9, 240.1);
		ssctx.bezierCurveTo(610.0, 240.1, 609.1, 240.0, 608.4, 239.6);
		ssctx.bezierCurveTo(607.6, 239.3, 606.9, 238.8, 606.4, 238.2);
		ssctx.bezierCurveTo(605.9, 237.6, 605.4, 236.8, 605.1, 235.9);
		ssctx.bezierCurveTo(604.9, 235.0, 604.7, 233.9, 604.7, 232.8);
		ssctx.bezierCurveTo(604.7, 231.6, 604.9, 230.6, 605.2, 229.7);
		ssctx.bezierCurveTo(605.4, 228.8, 605.9, 228.0, 606.4, 227.4);
		ssctx.bezierCurveTo(606.9, 226.7, 607.6, 226.3, 608.4, 225.9);
		ssctx.bezierCurveTo(609.1, 225.6, 610.0, 225.4, 610.9, 225.4);
		ssctx.bezierCurveTo(611.9, 225.4, 612.8, 225.6, 613.5, 225.9);
		ssctx.bezierCurveTo(614.3, 226.3, 614.9, 226.7, 615.5, 227.4);
		ssctx.closePath();

		// splashScreen/STUDIO/Compound Path/Path
		ssctx.moveTo(615.2, 232.8);
		ssctx.bezierCurveTo(615.2, 231.9, 615.1, 231.0, 614.9, 230.3);
		ssctx.bezierCurveTo(614.7, 229.6, 614.4, 229.0, 614.1, 228.5);
		ssctx.bezierCurveTo(613.7, 228.0, 613.2, 227.7, 612.7, 227.4);
		ssctx.bezierCurveTo(612.2, 227.2, 611.6, 227.1, 610.9, 227.1);
		ssctx.bezierCurveTo(610.3, 227.1, 609.7, 227.2, 609.2, 227.4);
		ssctx.bezierCurveTo(608.7, 227.7, 608.2, 228.0, 607.8, 228.5);
		ssctx.bezierCurveTo(607.4, 229.0, 607.2, 229.6, 607.0, 230.3);
		ssctx.bezierCurveTo(606.8, 231.0, 606.7, 231.9, 606.7, 232.8);
		ssctx.bezierCurveTo(606.7, 234.6, 607.0, 236.0, 607.8, 237.0);
		ssctx.bezierCurveTo(608.6, 238.0, 609.6, 238.5, 610.9, 238.5);
		ssctx.bezierCurveTo(612.3, 238.5, 613.3, 238.0, 614.1, 237.0);
		ssctx.bezierCurveTo(614.8, 236.0, 615.2, 234.6, 615.2, 232.8);
		ssctx.closePath();
		ssctx.fill();
		ssctx.restore();
		ssctx.restore();

	}



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

		// newAttributes/Check
		lctx.beginPath();
		lctx.moveTo(1.0, 7.0);
		lctx.lineTo(8.0, 14.0);
		lctx.lineTo(17.0, 3.0);
		lctx.lineTo(14.0, 0.0);
		lctx.lineTo(8.0, 8.0);
		lctx.lineTo(4.0, 4.0);
		lctx.lineTo(1.0, 7.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 43.0);
		lctx.lineTo(0.0, 43.0);
		lctx.lineTo(0.0, 44.0);
		lctx.lineTo(19.0, 44.0);
		lctx.lineTo(19.0, 43.0);
		lctx.lineTo(19.0, 43.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 35.0);
		lctx.lineTo(0.0, 35.0);
		lctx.lineTo(0.0, 36.0);
		lctx.lineTo(19.0, 36.0);
		lctx.lineTo(19.0, 35.0);
		lctx.lineTo(19.0, 35.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 39.0);
		lctx.lineTo(0.0, 39.0);
		lctx.lineTo(0.0, 40.0);
		lctx.lineTo(19.0, 40.0);
		lctx.lineTo(19.0, 39.0);
		lctx.lineTo(19.0, 39.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 26.0);
		lctx.lineTo(0.0, 26.0);
		lctx.lineTo(0.0, 27.0);
		lctx.lineTo(19.0, 27.0);
		lctx.lineTo(19.0, 26.0);
		lctx.lineTo(19.0, 26.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 18.0);
		lctx.lineTo(0.0, 18.0);
		lctx.lineTo(0.0, 19.0);
		lctx.lineTo(19.0, 19.0);
		lctx.lineTo(19.0, 18.0);
		lctx.lineTo(19.0, 18.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(19.0, 22.0);
		lctx.lineTo(0.0, 22.0);
		lctx.lineTo(0.0, 23.0);
		lctx.lineTo(19.0, 23.0);
		lctx.lineTo(19.0, 22.0);
		lctx.lineTo(19.0, 22.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(48.0, 10.0);
		lctx.lineTo(19.0, 10.0);
		lctx.lineTo(19.0, 11.0);
		lctx.lineTo(48.0, 11.0);
		lctx.lineTo(48.0, 10.0);
		lctx.lineTo(48.0, 10.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(48.0, 2.0);
		lctx.lineTo(19.0, 2.0);
		lctx.lineTo(19.0, 3.0);
		lctx.lineTo(48.0, 3.0);
		lctx.lineTo(48.0, 2.0);
		lctx.lineTo(48.0, 2.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Path
		lctx.beginPath();
		lctx.moveTo(48.0, 6.0);
		lctx.lineTo(19.0, 6.0);
		lctx.lineTo(19.0, 7.0);
		lctx.lineTo(48.0, 7.0);
		lctx.lineTo(48.0, 6.0);
		lctx.lineTo(48.0, 6.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Compound Path
		lctx.beginPath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(23.0, 16.0);
		lctx.lineTo(23.0, 29.0);
		lctx.lineTo(48.0, 29.0);
		lctx.lineTo(48.0, 16.0);
		lctx.lineTo(23.0, 16.0);
		lctx.closePath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(25.0, 25.0);
		lctx.lineTo(30.0, 20.0);
		lctx.lineTo(35.0, 25.0);
		lctx.lineTo(25.0, 25.0);
		lctx.closePath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(41.0, 25.0);
		lctx.lineTo(36.0, 20.0);
		lctx.lineTo(46.0, 20.0);
		lctx.lineTo(41.0, 25.0);
		lctx.closePath();
		lctx.fill();

		// newAttributes/Compound Path
		lctx.beginPath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(23.0, 33.0);
		lctx.lineTo(23.0, 46.0);
		lctx.lineTo(48.0, 46.0);
		lctx.lineTo(48.0, 33.0);
		lctx.lineTo(23.0, 33.0);
		lctx.closePath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(25.0, 42.0);
		lctx.lineTo(30.0, 37.0);
		lctx.lineTo(35.0, 42.0);
		lctx.lineTo(25.0, 42.0);
		lctx.closePath();

		// newAttributes/Compound Path/Path
		lctx.moveTo(41.0, 42.0);
		lctx.lineTo(36.0, 37.0);
		lctx.lineTo(46.0, 37.0);
		lctx.lineTo(41.0, 42.0);
		lctx.closePath();
		lctx.fill();
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

function drawPopOutButton(){
	var b = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="12px" viewBox="0 0 14 12" enable-background="new 0 0 14 12" xml:space="preserve">'+
		'<rect y="3" fill="rgb(0,170,225)" width="1" height="9"/>'+
		'<rect x="10" y="8" fill="rgb(0,170,225)" width="1" height="4"/>'+
		'<rect y="11" fill="rgb(0,170,225)" width="11" height="1"/>'+
		'<rect y="3" fill="rgb(0,170,225)" width="4" height="1"/>'+
		'<rect x="3" fill="rgb(0,170,225)" width="1" height="9"/>'+
		'<rect x="13" fill="rgb(0,170,225)" width="1" height="9"/>'+
		'<rect x="3" y="8" fill="rgb(0,170,225)" width="11" height="1"/>'+
		'<rect x="3" fill="rgb(0,170,225)" width="11" height="1"/>'+
		'</svg>';

	return b;
}

function drawPopInButton(){
	var b = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="14px" height="12px" viewBox="0 0 14 12" enable-background="new 0 0 14 12" xml:space="preserve">'+
		'<rect fill="rgb(0,170,225)" width="1" height="12"/>'+
		'<rect x="5" fill="rgb(0,170,225)" width="1" height="12"/>'+
		'<rect x="13" fill="rgb(0,170,225)" width="1" height="12"/>'+
		'<rect y="11" fill="rgb(0,170,225)" width="14" height="1"/>'+
		'<rect fill="rgb(0,170,225)" width="14" height="1"/>'+
		'</svg>';

	return b;
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
	lctx.fillStyle = _UI.colors.text_light;
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
		lctx.fillStyle = _UI.colors.accent;
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


