use lazy_static::lazy_static;
use schemius::core::interpreter::Interpreter;
use std::sync::Mutex;
use wasm_bindgen::prelude::*;

lazy_static! {
    static ref INTERPRETER: Mutex<Interpreter> = Mutex::new(Interpreter::default());
}

// #[wasm_bindgen]
// extern {
//     pub fn alert(s: &str);
// }

#[wasm_bindgen]
pub fn evaluate(expression: &str) -> String {
    INTERPRETER.try_lock().unwrap().eval_expression_and_format(expression.to_string())
}
