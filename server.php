<?php
$_POST=json_decode(file_get_contents("php://input"),true);
echo var_dump($_POST);//Эта команда берет те даные.что пришли от клиента,превращает в страку и показывает нам те данные на клиенте
