using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WEBAPI.Models;

namespace WEBAPI.Controllers
{
    [Authorize(Roles = "Admin")]
    public class StockStatusController : ApiController
    {
        private CafeteriaDbEntities db = new CafeteriaDbEntities();

        // GET: api/StockStatus
        [HttpGet]
        public IQueryable<StockStatu> GetStockStatus()
        {
            return db.StockStatus;
        }

        // GET: api/StockStatus/5
        [ResponseType(typeof(StockStatu))]
        [HttpGet]
        public async Task<IHttpActionResult> GetStockStatu(Guid id)
        {
            StockStatu stockStatu = await db.StockStatus.FindAsync(id);
            if (stockStatu == null)
            {
                return NotFound();
            }

            return Ok(stockStatu);
        }

        // PUT: api/StockStatus/5
        [ResponseType(typeof(void))]
        [HttpPut]
        public async Task<IHttpActionResult> PutStockStatu(Guid id, StockStatu stockStatu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != stockStatu.Id)
            {
                return BadRequest();
            }

            db.Entry(stockStatu).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StockStatuExists(id))
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

        // POST: api/StockStatus
        [ResponseType(typeof(StockStatu))]
        [HttpPost]
        public async Task<IHttpActionResult> PostStockStatu(StockStatu stockStatu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.StockStatus.Add(stockStatu);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StockStatuExists(stockStatu.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = stockStatu.Id }, stockStatu);
        }

        // DELETE: api/StockStatus/5
        [ResponseType(typeof(StockStatu))]
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteStockStatu(Guid id)
        {
            StockStatu stockStatu = await db.StockStatus.FindAsync(id);
            if (stockStatu == null)
            {
                return NotFound();
            }

            db.StockStatus.Remove(stockStatu);
            await db.SaveChangesAsync();

            return Ok(stockStatu);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StockStatuExists(Guid id)
        {
            return db.StockStatus.Count(e => e.Id == id) > 0;
        }
    }
}