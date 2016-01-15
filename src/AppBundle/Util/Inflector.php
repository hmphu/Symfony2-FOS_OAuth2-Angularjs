<?php
namespace AppBundle\Util;

use FOS\RestBundle\Util\Inflector\InflectorInterface;

/**
 * Inflector class
 *
 */
class Inflector implements InflectorInterface
{
    public function pluralize($word)
    {
        // Don't pluralize
        return $word;
    }
}