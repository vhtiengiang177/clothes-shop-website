﻿using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Infrastructure.Persistent.Repository
{
    public interface IPromotionsRepository
    {
        Task<IQueryable<Promotion>> GetAllPromotions();
        Promotion GetPromotionByID(int promotionID);
        Promotion GetPromotionByName(string promotionCode);
        Promotion CreatePromotion(Promotion promotion);
        void UpdatePromotion(Promotion promotion);
        Task<IQueryable<Promotion>> GetPromotionsEffective();
    }
}