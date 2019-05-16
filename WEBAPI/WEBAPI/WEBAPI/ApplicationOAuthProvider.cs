using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using WEBAPI.Models;

namespace WEBAPI
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var user = await manager.FindAsync(context.UserName, context.Password);
            if (user != null)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim("Username", user.UserName));
                identity.AddClaim(new Claim("Email", user.Email));
                identity.AddClaim(new Claim("LoggedOn", DateTime.Now.ToString()));
                var userRoles = manager.GetRoles(user.Id);
                foreach (var rolename in userRoles)
                {
                    identity.AddClaim(new Claim(ClaimTypes.Role, rolename));

                }
                var additionalData = new AuthenticationProperties(new Dictionary<string, string>{

                    {

                        "role", Newtonsoft.Json.JsonConvert.SerializeObject(userRoles)

                    }

                });
                var token = new AuthenticationTicket(identity, additionalData);
                context.Validated(token);
            }
            else
                return;
            //return base.GrantResourceOwnerCredentials(context);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string,string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key,property.Value);
            }
            return Task.FromResult<object>(null);
        }
    }
}