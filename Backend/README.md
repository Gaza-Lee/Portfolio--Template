# PortfolioApi

An ASP.NET Core Web API backend to receive contact form messages and send them to your email.

## Requirements

- .NET 8 SDK
- SMTP account (Gmail, Outlook, etc.)

## How to Run

1. Replace placeholder email and SMTP values in `ContactController.cs`
2. Open terminal in the project directory
3. Run the API:

```bash
dotnet run
```

## Endpoint

**POST** `/api/contact`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Test Subject",
  "message": "Hello, this is a test message."
}
```