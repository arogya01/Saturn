so, we've to focus on the design decisions for saturn. 

- Initialize the Repository 
> saturn init / saturn init -y (creates saturn.json)

- Add Dependencies 
> saturn add <package-name>
 
- Remove Dependencies 
> saturn remove <package-name>
 
- List Dependencies 
> saturn list
 
- Update Dependencies 
> saturn update
 
- Install Dependencies 
> saturn install
 
the above commands are the basic necessities for a package manager.
how're we internally going to hash out and organize the codebase for these commands? 
I'm unsure about the design decisions for the codebase structure.


Side Effects that happen on disk or network:: 

1. Creating saturn.json 
2. How are we going to store the modules on disk, what methods do npm use, pnpm use or yarn uses ? 



- "Saturn add" should edit saturn.json and also install the module too. 
- I think we can skip "Saturn update for now" 
- that also makes sense, Saturn list is not adding in any real value for now. 
- yes, for "Saturn remove", we'll require a lockfile to manage deps, and we'll need to update the lockfile when we remove a dep. 
- saturn run is to be included in the roadmap, it's urgent. 

Hence, the final list of API Layer we're trying to create is: 
- saturn init
- saturn add
- saturn remove
- saturn install
- saturn run

thinking about the question of:: 
