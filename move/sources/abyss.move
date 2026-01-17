module abyss::abyss;

use std::string::String;
use sui::url;
use sui::coin::{Self, TreasuryCap};

public struct AirdropNFT has key, store{
	id: UID,
	name: String,
	image_url: String,
	description: String,
}

public struct ABYSS has drop()

fun init(otw: ABYSS, ctx: &mut TxContext){	
	let icon_url = url::new_unsafe_from_bytes(b"https://framerusercontent.com/images/0KKocValgAmB9XHzcFI6tALxGGQ.jpg");
	
	let (treasure_cap, metadata) = coin::create_currency(
		otw,
		6,
		b"ABYSS",
		b"Abyss; Coin",
		b"Claiming from web2 made easy",
		option::some(icon_url),
		ctx
	);
	
	transfer::public_freeze_object(metadata);
	
	transfer::public_transfer(treasure_cap, ctx.sender());
}

public fun mint_abyss(cap: &mut TreasuryCap<ABYSS>, amount: u64, recipient: address, ctx: &mut TxContext){
	let coin = coin::mint(cap, amount, ctx);
	transfer::public_transfer(coin, recipient);
}

public fun mint_nft(name: String, image_url: String, description: String, recipient: address, ctx: &mut TxContext){
	let nft = AirdropNFT {
		id: object::new(ctx),
		name,
		image_url,
		description
	};
	transfer::public_transfer(nft, recipient);
}