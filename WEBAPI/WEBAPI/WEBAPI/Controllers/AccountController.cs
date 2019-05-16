using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using WEBAPI.Models;

namespace WEBAPI.Controllers
{
    public class AccountController : ApiController
    {

        // GET: api/Account
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Account/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Account
        [Route("api/User/Register")]
        [HttpPost]
        [AllowAnonymous]
        public IdentityResult Post(AccountViewModel model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = new ApplicationUser() { UserName = model.UserName, Email = model.Email };
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 3
            };
            IdentityResult result = manager.Create(user, model.Password);
            manager.AddToRoles(user.Id, model.Roles);
            return result;
        }

        [Route("api/User/Claims")]
        [HttpGet]
        public AccountViewModel GetUserClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            AccountViewModel model = new AccountViewModel()
            {
                UserName = identityClaims.FindFirst("Username").Value,
                Email = identityClaims.FindFirst("Email").Value,
                LoggedOn = identityClaims.FindFirst("LoggedOn").Value,

            };
            return model;
        }


        [HttpGet]
        [Authorize(Roles ="Admin")]
        [Route("api/AdminRole")]
        public string AdminRole()
        {
            return "Admin Role user";
        }
        [HttpGet]
        [Authorize(Roles = "SalePerson")]
        [Route("api/SalePerson")]
        public string SalesPersonRole()
        {
            return "Sales Person Role user";
        }
        [HttpGet]
        [Authorize(Roles = "User")]
        [Route("api/NormalUser")]
        public string NormalUserRole()
        {
            return "Normal User Role user";
        }
        // PUT: api/Account/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Account/5
        public void Delete(int id)
        {
        }
    }
}
