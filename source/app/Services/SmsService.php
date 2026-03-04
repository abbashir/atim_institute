<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsService
{
  protected $apiKey;
  protected $senderId;
  protected $baseUrl;
  protected $balanceUrl;

  public function __construct()
  {
    $this->apiKey     = config('services.bulksms.api_key');
    $this->senderId   = config('services.bulksms.sender_id');
    $this->baseUrl    = config('services.bulksms.base_url');
    $this->balanceUrl = config('services.bulksms.balance_url');
  }

  /**
   * Send SMS to a single number
   */
  public function sendSms($number, $message)
  {
    // Safety: Ensure number starts with 88
    $formattedNumber = str_starts_with($number, '88') ? $number : '88' . $number;

    try {
      $response = Http::get($this->baseUrl, [
        'api_key'  => $this->apiKey,
        'type'     => 'text',
        'number'   => $formattedNumber,
        'senderid' => $this->senderId,
        'message'  => $message
      ]);

      $result = $response->json();

      dd($result);

      if (isset($result['response_code']) && $result['response_code'] == 202) {
        return true;
      }

      Log::warning("BulkSMSBD Error: " . ($result['success_message'] ?? 'Unknown Error'), $result);
      return false;

    } catch (\Exception $e) {
      Log::error("BulkSMSBD Exception: " . $e->getMessage());
      return false;
    }
  }

  /**
   * Check remaining SMS balance
   */
  public function getBalance()
  {
    try {
      $response = Http::get($this->balanceUrl, [
        'api_key' => $this->apiKey
      ]);
      return $response->json();
    } catch (\Exception $e) {
      return null;
    }
  }
}