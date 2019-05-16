using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WEBAPI.Models;

namespace WEBAPI.Controllers
{
    public class RoleController : ApiController
    {
        [Route("api/GetAllRoles")]
        [HttpGet]
        public IHttpActionResult GetRoles()
        {
            var roleStore = new RoleStore<IdentityRole>(new ApplicationContext());
            var roleManager = new RoleManager<IdentityRole>(roleStore);

            var roles = roleManager.Roles.Select(x => new { x.Id, x.Name }).ToList();
            return Ok(roles);
        }
    }
}
