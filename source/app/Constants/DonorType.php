<?php

namespace App\Constants;

class DonorType
{
    const MONTHLY  = 'Monthly';
    const YEARLY   = 'Yearly';
    const ONE_TIME = 'One-time';

    const ALL = [
        self::MONTHLY,
        self::YEARLY,
        self::ONE_TIME,
    ];
}
