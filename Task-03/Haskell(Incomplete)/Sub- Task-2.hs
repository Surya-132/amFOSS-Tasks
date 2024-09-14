import System.IO

main :: IO ()
main = do
    
    contents <- readFile "input.txt"
    
    writeFile "output.txt" contents
