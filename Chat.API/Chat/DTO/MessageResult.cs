using System;

namespace Chat.DTO
{
    public class MessageResult
    {
        public string From { get; }
        public string Content { get; }
        public DateTime Date { get; }

        public MessageResult(string @from, string content, DateTime date)
        {
            From = @from;
            Content = content;
            Date = date;
        }
    }
}