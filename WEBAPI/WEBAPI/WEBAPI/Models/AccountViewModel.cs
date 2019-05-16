using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WEBAPI.Models
{
    public class AccountViewModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public string LoggedOn { get; set; }

        public string[] Roles { get; set; }
    }
}