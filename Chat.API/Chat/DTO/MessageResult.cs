using System;

namespace Chat.DTO
{
    public class MessageResult
    {
        public string From { get; }
        public string Content { get; }
        public DateTime Created { get; }

        public MessageResult(string @from, string content, DateTime created)
        {
            From = @from;
            Content = content;
            Created = created;
        }
    }
}