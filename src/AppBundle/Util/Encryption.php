<?php
/**
 * Created by PhpStorm.
 * User: root
 * Date: 04.12.15
 * Time: 14:39
 */

namespace AppBundle\Util;

class Encryption
{
    private $key = "ZnoFT3cvEkl7745EO8e79205d2R5u2hs";

    private function b64Encode($string)
    {
        $data = base64_encode($string);
        $data = str_replace(array('+','/','='), array('-','_',''), $data);
        return $data;
    }

    private function b64Decode($string)
    {
        $data = str_replace(array('-','_'), array('+','/'), $string);
        $mod4 = strlen($data) % 4;
        if ($mod4) {
            $data .= substr('====', $mod4);
        }
        return base64_decode($data);
    }

    public function encode($value)
    {
        if (!$value) {
            return false;
        }
        $text = $value;
        $ivSize = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
        $iv = mcrypt_create_iv($ivSize, MCRYPT_RAND);
        $cryptText = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $this->key, $text, MCRYPT_MODE_ECB, $iv);
        return trim($this->b64Encode($cryptText));
    }

    public function decode($value)
    {
        if (!$value) {
            return false;
        }
        $cryptText = $this->b64Decode($value);
        $ivSize = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
        $iv = mcrypt_create_iv($ivSize, MCRYPT_RAND);
        $decryptText = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $this->key, $cryptText, MCRYPT_MODE_ECB, $iv);
        return trim($decryptText);
    }
}