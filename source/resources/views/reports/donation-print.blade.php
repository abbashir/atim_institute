<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; color: #1e293b; margin: 0; padding: 24px; }

        .header-wrap { width: 100%; border-bottom: 3px solid #1e293b; padding-bottom: 12px; margin-bottom: 18px; }
        .header-table { width: 100%; border-collapse: collapse; }
        .header-logo-cell { width: 70px; vertical-align: middle; }
        .header-logo {
            width: 60px; height: 60px; border-radius: 50%;
            border: 2px solid #1e293b; text-align: center; line-height: 60px;
            font-size: 22px; font-weight: bold; color: #1e293b; background: #f1f5f9;
        }
        .header-info-cell { vertical-align: middle; padding-left: 12px; }
        .org-name    { font-size: 17px; font-weight: bold; color: #1e293b; margin-bottom: 3px; }
        .org-address { font-size: 10px; color: #475569; margin-bottom: 2px; }
        .org-contact { font-size: 10px; color: #475569; }
        .org-contact span { margin-right: 16px; }

        .report-title-row { text-align: center; margin: 10px 0 18px 0; }
        .report-title { font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #1e293b; }
        .report-period { font-size: 10px; color: #64748b; margin-top: 3px; }

        table { width: 100%; border-collapse: collapse; margin-top: 12px; }
        th { background: #1e293b; color: #fff; padding: 8px 10px; text-align: left; font-size: 11px; }
        td { padding: 7px 10px; border-bottom: 1px solid #e2e8f0; font-size: 11px; vertical-align: top; }
        tr:nth-child(even) td { background: #f8fafc; }

        .total-row td  { font-weight: bold; border-top: 2px solid #1e293b; background: #f1f5f9; }
        .amount        { text-align: right; }
        .amount-val    { text-align: right; font-weight: bold; }
        .badge-ontime  { color: #16a34a; font-weight: bold; }
        .badge-monthly { color: #dc2626; font-weight: bold; }
        .footer        { margin-top: 20px; font-size: 10px; color: #94a3b8; text-align: right; }
    </style>
</head>
<body>

@include('reports.partials.org-header')

<div class="report-title-row">
    <div class="report-title">Donation Collection Report</div>
    <div class="report-period">Period: {{ $fromLabel }} &mdash; {{ $toLabel }}</div>
</div>

<table>
    <thead>
    <tr>
        <th>#</th>
        <th>Date</th>
        <th>Donor Name</th>
        <th>Phone</th>
        <th>Type</th>
        <th>Method</th>
        <th>Receipt</th>
        <th class="amount">Amount</th>
    </tr>
    </thead>
    <tbody>
    @foreach($donations as $i => $donation)
        <tr>
            <td>{{ $i + 1 }}</td>
            <td>{{ \Carbon\Carbon::parse($donation->paid_at)->format('d M Y') }}</td>
            <td>{{ $donation->donor?->full_name }}</td>
            <td>{{ $donation->donor?->phone }}</td>
            <td>
                @if($donation->is_on_time)
                    <span class="badge-ontime">On-time</span>
                @else
                    <span class="badge-monthly">Monthly</span>
                @endif
            </td>
            <td>{{ $donation->payment_method }}</td>
            <td>{{ $donation->receipt_no ?? '—' }}</td>
            <td class="amount-val">{{ number_format($donation->amount, 2) }}</td>
        </tr>
    @endforeach
    <tr class="total-row">
        <td colspan="7">Total</td>
        <td class="amount">{{ $totalAmount }}</td>
    </tr>
    </tbody>
</table>

<div class="footer">Generated on {{ now()->format('d M Y, h:i A') }}</div>

</body>
</html>