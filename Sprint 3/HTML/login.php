<html>
<head>
	<title>Ciudad Games - The Best Source for Entertainment</title>
	<link rel="icon" href="./assets/logo.png">
	<link rel="stylesheet" type="text/css" href="../CSS/style_global.css">
	<link rel="stylesheet" type="text/css" href="../CSS/style_profile.css">
	<script type="text/javascript" src="../JavaScript/showTab.js"></script>
</head>
<body>
	<ul class="navigation-bar">
		<div class="page-margin">
			<li class="navigation-logo"><a href="index.html"><img src="./assets/logo.png"></img></a></li>
			<li class="navigation-title"><a href="index.html">Ciudad Games</a></li>
			<li class="navigation-tab"><a href="index.html">Home</a></li>
			<li class="navigation-tab"><a href="news.html">News</a></li>
			<li class="navigation-tab"><a href="library.html">Library</a></li>
			<li class="navigation-tab"><a href="company.html">Company</a></li>
			<li class="navigation-profile"><a href="profile.html"><b>Guest12345</b><br>0 Points</a></li>
			<li class="navigation-profile"><a href="profile.html"><img src="./assets/profile-default.jpg"></img></a></li>
		</div>
	</ul>
	<div class="content">
		<div class="page-margin">
			<div class="account">
				<div class="account-frame">
					<img src="./assets/profile-default.jpg"></img>
					<div class="account-frame-text">
						<h1>Guest12345</h1>
						<div class="signup"><a href="profile.html">Sign-Up</a></div>
					</div>
				</div>
				<h2>Log-In Account</h2>
				<form action="../Backend Programming/login.php" method="post">
						<?php if (isset($_GET['error'])) { ?>
							<p class="error"><?php echo $_GET['error']; ?></p>
						<?php } ?>
				<table align="center" class="table-reg">
					<tr><td class="name">Username</td><td><input type="text" name="username" class="textbox"></input></td></tr>
					<tr><td class="name">Password</td><td><input type="password" name="password" class="textbox"></input></td></tr>
					<tr><td></td><td>
						<div class="submit"><button type="submit" class="submitbox">Submit</button></div>
						<div class="reset"><a href="profile-reset.html">Reset</a></div></td>
					</tr>
					</form>
				</table>
			</div>
			<div class="recommended">
				<i>Recommended Games</i>
				<div class="recommended-box">
					<a href="./gamepage/vtuberrush.html"><img src="./assets/recart-vtuberrush.png"></img></a>
					<div class="game-info">
						<div class="name">
							<h3>VTuber Rush!</h3>
							<h5 class="download">Downloadable</h5>
						</div>
						<div class="rating">
							<h2>4.5</h2>
							<img src="./assets/rating-5stars.png"></img>
						</div>
					</div>
				</div>
				<div class="recommended-box">
					<a href="./gamepage/pocketbeasts.html"><img src="./assets/recart-pocketbeasts.png"></img></a>
					<div class="game-info">
						<div class="name">
							<h3>Pocket Beasts</h3>
							<h5 class="play">Ready to Play</h5>
						</div>
						<div class="rating">
							<h2>3.8</h2>
							<img src="./assets/rating-5stars.png"></img>
						</div>
					</div>
				</div>
				<div class="recommended-box">
					<a href="./gamepage/dragontales.html"><img src="./assets/recart-dragontales.png"></img></a>
					<div class="game-info">
						<div class="name">
							<h3>Dragon Tales</h3>
							<h5 class="wip">Coming Soon</h5>
						</div>
						<div class="rating">
							<h2>N/A</h2>
							<img src="./assets/rating-5stars.png"></img>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer">
			<div class="page-margin">
				<div class="logo">
					<a href="index.html"><img src="./assets/logo.png"></img></a>
					<a href="index.html"><h1>Ciudad Games</h1></a><br>
					<p><b>Ciudad Games</b> is a public platform for students and young kids to start learning
						fundamental skills while playing video games. These games are written in HTML5 and JavaScript,
						ensuring that users can play using only a browser without the need for downloads.<br><br>

						This web application is a conceptual framework created by Gio Carlo Ciudadano as a partial
						requirement for his course in CMSC 126. The images, videos, and logos used in this application are all
						licensed under CC-0 or Creative Commons, allowing the student to use such assets for educational
					purposes only.</p>
				</div>
				<div class="categories">
					<h3>Quick Access</h3>
					<p><a href="index.html">Home</a><br></p>
					<p><a href="news.html">News</a><br></p>
					<p><a href="library.html">Library</a><br></p>
					<p><a href="company.html">Company</a><br></p>
					<p><a href="profile.html">Profile</a><br></p>
				</div>
				<div class="categories">
					<h3>LEGAL & CONTACT</h3>
					<p><a href="terms-and-conditions.html">Terms of Use</a><br></p>
					<p><a href="privacy-policy.html">Privacy Policy</a><br></p>
					<p><a href="contact-us.html">Contact Us</a><br></p>
				</div>
			</div>
		</div>
</body>
</html>