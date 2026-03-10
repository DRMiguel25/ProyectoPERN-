import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator';

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    // Revisar si las reglas del router detectaron errores
    let errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // Si no hay errores, pasamos al siguiente middleware o al controlador
    next();
};