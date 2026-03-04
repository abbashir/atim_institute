<?php

namespace App\Helpers;

use Carbon\Carbon;

class DateFormat
{
  /**
   * Format for Bangladesh: 04 March 2026
   * Usage: DateFormat::dMy($expense->expense_date)
   */
  public static function CustomDate($date)
  {
    return self::formatDate($date, 'd F Y');
  }

  /**
   * Format for Bangladesh: 04 March 2026, 10:30 AM
   * Usage: DateFormat::dMyTime($expense->created_at)
   */
  public static function CustomDateTime($date)
  {
    return self::formatDate($date, 'd F Y, h:i A');
  }

  /**
   * Internal Core Formatter
   */
  public static function formatDate($column, $format = "M d, Y")
  {
    if (!$column) return 'N/A';

    // Set default timezone to Bangladesh if session is empty
    $zone = session("timezone") ?: 'Asia/Dhaka';

    if (!($column instanceof Carbon)) {
      $column = Carbon::parse($column);
    }

    return $column->setTimezone($zone)->format($format);
  }
}