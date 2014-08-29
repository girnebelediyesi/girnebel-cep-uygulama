<?php

if (!$link = mysql_connect('localhost', 'admin', 'e4qw9W')) {
    echo 'Could not connect to mysql';
    exit;
}

if (!mysql_select_db('KentRehberi', $link)) {
    echo 'Could not select database';
    exit;
}