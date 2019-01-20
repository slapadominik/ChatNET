using System;

namespace Chat.Exceptions
{
    public class UsernameIsTakenException : Exception
    {
        public UsernameIsTakenException()
        {
        }

        public UsernameIsTakenException(string message) : base(message)
        {
        }
    }
}