<?php

function containBannedWord(array $bannedWords, string $sentence){
    foreach ($bannedWords as $word) {
        if (stripos($sentence, $word) !== false) {
            return true;
        }
    }
    return false;
}
?>