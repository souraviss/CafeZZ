using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WEBAPI.Models;

namespace WEBAPI.Controllers
{
    [Authorize(Roles = "Admin")]
    public class CategoriesController : ApiController
    {
        private CafeteriaDbEntities db = new CafeteriaDbEntities();

        // GET: api/Categories
        [HttpGet]
        [AllowAnonymous]
        public IQueryable<Category> GetCategories()
        {
            return db.Categories;
        }

        // GET: api/Categories/5
        [ResponseType(typeof(Category))]
        [HttpGet]
        public IHttpActionResult GetCategory(Guid id)
        {
            Category category = db.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // PUT: api/Categories/5
        [ResponseType(typeof(void))]
        [HttpPut]
        public IHttpActionResult PutCategory(Guid id, Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != category.Id)
            {
                return BadRequest();
            }

            db.Entry(category).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Categories
        [Route("api/PostCategory")]
        [HttpPost]
        public IHttpActionResult PostCategory(Category category)
        {
            

            category.Id = Guid.NewGuid();

            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            db.Categories.Add(category);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CategoryExists(category.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            //return CreatedAtRoute("DefaultApi", new { id = category.Id }, category);
          return  StatusCode(HttpStatusCode.OK);
        }

        // DELETE: api/Categories/5
        //[ResponseType(typeof(Category))]
        [Route("api/DeleteCategory")]
        [HttpPost]
        public IHttpActionResult DeleteCategory(Category category)
        {
            Category cat = db.Categories.Find(category.Id);
            if (category == null)
            {
                return NotFound();
            }

            db.Categories.Remove(cat);
            db.SaveChanges();

            return Ok(category);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryExists(Guid id)
        {
            return db.Categories.Count(e => e.Id == id) > 0;
        }
    }
}